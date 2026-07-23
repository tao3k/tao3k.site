declare module "*.css";
declare module "*.webp" {
  const source: string;
  export default source;
}
declare module "*.wasm" {
  const source: string;
  export default source;
}
declare module "*.bin" {
  const source: string;
  export default source;
}
declare module "*?url" {
  const source: string;
  export default source;
}
declare module "@poo-flow/runtime-wasm/wasm" {
  const source: string;
  export default source;
}
declare module "@poo-flow/runtime-wasm/workflows/human-capability/descriptor" {
  const source: string;
  export default source;
}
declare module "@poo-flow/runtime-wasm/workflows/human-capability/arena" {
  const source: string;
  export default source;
}

declare const __TAO3K_BASE_PATH__: string;
