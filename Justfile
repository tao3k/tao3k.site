set shell := ["bash", "-uc"]

host := "127.0.0.1"
org_zhixing_host := env_var_or_default("ORG_ZHIXING_HOST", "../orgize/.data/org-zhixing")

default:
    @just --list

# Start the independent Zhixing theme workbench.
theme port="4174":
    @echo "Theme workbench: http://{{host}}:{{port}}/"
    direnv exec . env ORG_ZHIXING_THEME_PORT={{port}} ORG_ZHIXING_THEME_ORIGIN=http://{{host}}:{{port}} npm run theme:dev -- --host {{host}}

# Build the remote provider, then serve the production artifact.
theme-preview port="4174":
    direnv exec . env ORG_ZHIXING_THEME_PORT={{port}} ORG_ZHIXING_THEME_ORIGIN=http://{{host}}:{{port}} npm run theme:build
    @echo "Theme production preview: http://{{host}}:{{port}}/"
    direnv exec . env ORG_ZHIXING_THEME_PORT={{port}} ORG_ZHIXING_THEME_ORIGIN=http://{{host}}:{{port}} npm run theme:preview -- --host {{host}} --port {{port}}

# Start tao3k.site through its Org-Zhixing config and federated theme.
site port="3000":
    #!/usr/bin/env bash
    set -euo pipefail

    repo_root="$PWD"
    zhixing_root="$(cd "{{org_zhixing_host}}" && pwd)"
    config_path="$repo_root/org-zhixing.toml"
    local_config_path="$repo_root/.cache/org-zhixing/local-preview.toml"
    content_root="$repo_root/docs"
    theme_port="${ORG_ZHIXING_THEME_PORT:-$(( {{port}} + 1 ))}"

    test -f "$config_path"
    test -d "$content_root"
    test -f "$zhixing_root/package.json"

    echo "Theme remote: http://{{host}}:$theme_port/mf-manifest.json"
    direnv exec "$repo_root" env \
      ORG_ZHIXING_THEME_PORT="$theme_port" \
      ORG_ZHIXING_THEME_ORIGIN="http://{{host}}:$theme_port" \
      npm run theme:dev -- --host {{host}} &
    theme_pid=$!

    cleanup() {
      kill "$theme_pid" 2>/dev/null || true
      wait "$theme_pid" 2>/dev/null || true
    }
    trap cleanup EXIT INT TERM

    for _ in $(seq 1 120); do
    if curl --fail --silent --output /dev/null "http://{{host}}:$theme_port/mf-manifest.json"; then
        break
      fi
      if ! kill -0 "$theme_pid" 2>/dev/null; then
        wait "$theme_pid"
        exit 1
      fi
      sleep 0.25
    done
    curl --fail --silent --output /dev/null "http://{{host}}:$theme_port/mf-manifest.json"

    direnv exec "$repo_root" node theme/src/build/prepare-local-config.mjs \
      "$config_path" \
      "$local_config_path" \
      "http://{{host}}:$theme_port/mf-manifest.json"

    echo "Org-Zhixing config: $local_config_path"
    echo "Site development server: http://{{host}}:{{port}}/"
    (
      cd "$zhixing_root"
      direnv exec . env \
        ORG_ZHIXING_CONFIG="$local_config_path" \
        ORG_ZHIXING_CONTENT_DIR="$content_root" \
        ORG_ZHIXING_BASE_PATH="/" \
        just dev {{port}}
    )

# Run the contract, Org, lint, type, application, and theme gates.
check:
    direnv exec . npm run validate

# Refresh only the pinned Zhixing contract cache.
contract:
    direnv exec . npm run theme:contract:sync

# List the local entry points without starting a server.
urls:
    @echo "Theme: http://{{host}}:4174/"
    @echo "Site:  http://{{host}}:3000/"
