/* eslint-disable no-unused-vars */
const PROTOCOL = process.env.REACT_APP_PROTOCOL || "http://"
const SERVER_ADDR = process.env.REACT_APP_BACKEND_URI || "localhost:5005/";
const GET_CODE_BLOCKS_ENDPOINT = "code-blocks";

export {PROTOCOL, SERVER_ADDR, GET_CODE_BLOCKS_ENDPOINT};