import { atom } from "recoil";

export const globalState = atom({
  key: "globalKey",
  default: {
    testnet: true,
    test_api: "https://geo-test.w3bstream.com/api/pol",
    main_api: "https://geo.w3bstream.com/api/pol",
  },
});
