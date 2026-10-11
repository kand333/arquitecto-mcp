// Mở live editor cho biệt thự demo — giữ server chạy tới khi bị dừng
import { LiveServer } from "../src/live.js";
import { ProjectStore } from "../src/store.js";

const store = new ProjectStore("sandbox/demo-video");
store.openProject();
const live = new LiveServer(store, {});
await live.start();
const url = live.editorUrl()!; // A1: URL con token del propietario
console.log(`EDITOR: ${url}`);
await new Promise(() => {});
