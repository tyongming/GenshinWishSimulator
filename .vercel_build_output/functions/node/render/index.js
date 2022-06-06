var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_worker_threads, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    import_node_worker_threads = require("worker_threads");
    init_install_fetch();
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data2) {
        let i2 = 0;
        const length_ = data2.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data2.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data2);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data2.length, data2);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data2[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data2[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data2[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base642 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base642 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base642 ? "base64" : "ascii";
  const data2 = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data2, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data2) {
  if (data2[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data2.url}`);
  }
  data2[INTERNALS$2].disturbed = true;
  if (data2[INTERNALS$2].error) {
    throw data2[INTERNALS$2].error;
  }
  const { body } = data2;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data2.size > 0 && accumBytes + chunk.length > data2.size) {
        const error2 = new FetchError(`content size at ${data2.url} over limit: ${data2.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data2.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data2.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data2.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data2 = dataUriToBuffer(request.url);
      const response2 = new Response2(data2, { headers: { "Content-Type": data2.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflate(), reject) : (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function installFetch() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      configurable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      configurable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      configurable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      configurable: true,
      value: Headers2
    }
  });
}
var import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _parts, _type, _size, _a, _Blob, Blob, Blob$1, _lastModified, _name, _a2, _File, File, t, i, h, r, m, f2, e, x, _d, _a3, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    import_node_http = __toESM(require("http"), 1);
    import_node_https = __toESM(require("https"), 1);
    import_node_zlib = __toESM(require("zlib"), 1);
    import_node_stream = __toESM(require("stream"), 1);
    import_node_util = require("util");
    import_node_url = require("url");
    import_net = require("net");
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a4) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length2 = end - begin;
          const slice = new ArrayBuffer(length2);
          CopyDataBlockBytes(slice, 0, buffer, begin, length2);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry3 = this._queue.shift();
              this._queueTotalSize -= entry3.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry3.buffer, entry3.byteOffset, entry3.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a4) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a4;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a4 = stream._writableStreamController._abortController) === null || _a4 === void 0 ? void 0 : _a4.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a4) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop4);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable2, "readable", "ReadableWritablePair");
          assertReadableStream(readable2, `${context} has member 'readable' that`);
          const writable3 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable3, "writable", "ReadableWritablePair");
          assertWritableStream(writable3, `${context} has member 'writable' that`);
          return { readable: readable2, writable: writable3 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable3 = stream._writable;
              const state = writable3._state;
              if (state === "erroring") {
                throw writable3._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable2 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable2._state === "errored") {
              throw readable2._storedError;
            }
            ReadableStreamDefaultControllerClose(readable2._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable2._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob2 } = require("buffer");
      if (Blob2 && !Blob2.prototype.stream) {
        Blob2.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = (_a = class {
      constructor(blobParts = [], options = {}) {
        __privateAdd(this, _parts, []);
        __privateAdd(this, _type, "");
        __privateAdd(this, _size, 0);
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder2 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof _a) {
            part = element;
          } else {
            part = encoder2.encode(element);
          }
          __privateSet(this, _size, __privateGet(this, _size) + (ArrayBuffer.isView(part) ? part.byteLength : part.size));
          __privateGet(this, _parts).push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : "");
      }
      get size() {
        return __privateGet(this, _size);
      }
      get type() {
        return __privateGet(this, _type);
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(__privateGet(this, _parts), false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data2 = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
          data2.set(chunk, offset);
          offset += chunk.length;
        }
        return data2.buffer;
      }
      stream() {
        const it = toIterator(__privateGet(this, _parts), true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = __privateGet(this, _parts);
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new _a([], { type: String(type).toLowerCase() });
        __privateSet(blob, _size, span);
        __privateSet(blob, _parts, blobParts);
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    }, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _a);
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob = _Blob;
    Blob$1 = Blob;
    _File = (_a2 = class extends Blob$1 {
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        __privateAdd(this, _lastModified, 0);
        __privateAdd(this, _name, "");
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          __privateSet(this, _lastModified, lastModified);
        }
        __privateSet(this, _name, String(fileName));
      }
      get name() {
        return __privateGet(this, _name);
      }
      get lastModified() {
        return __privateGet(this, _lastModified);
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    }, _lastModified = new WeakMap(), _name = new WeakMap(), _a2);
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = (_a3 = class {
      constructor(...a) {
        __privateAdd(this, _d, []);
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        __privateGet(this, _d).push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        __privateSet(this, _d, __privateGet(this, _d).filter(([b]) => b !== a));
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = __privateGet(this, _d), l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        __privateGet(this, _d).forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return __privateGet(this, _d).some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        __privateGet(this, _d).forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        __privateSet(this, _d, b);
      }
      *entries() {
        yield* __privateGet(this, _d);
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    }, _d = new WeakMap(), _a3);
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers2) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_node_util.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers2(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-437e72a6.js
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function custom_event(type, detail, bubbles = false) {
  const e2 = document.createEvent("CustomEvent");
  e2.initCustomEvent(type, bubbles, false, detail);
  return e2;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css6) => css6.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape_attribute_value(value.toString())}"`;
  return ` ${name}${assignment}`;
}
var current_component, escaped, missing_component, on_destroy;
var init_index_437e72a6 = __esm({
  ".svelte-kit/output/server/chunks/index-437e72a6.js"() {
    Promise.resolve();
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse2;
    exports.serialize = serialize2;
    var decode2 = decodeURIComponent;
    var encode2 = encodeURIComponent;
    var pairSplitRegExp = /; */;
    var fieldContentRegExp2 = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(pairSplitRegExp);
      var dec = opt.decode || decode2;
      for (var i2 = 0; i2 < pairs.length; i2++) {
        var pair = pairs[i2];
        var eq_idx = pair.indexOf("=");
        if (eq_idx < 0) {
          continue;
        }
        var key2 = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        if (val[0] == '"') {
          val = val.slice(1, -1);
        }
        if (obj[key2] == void 0) {
          obj[key2] = tryDecode2(val, dec);
        }
      }
      return obj;
    }
    function serialize2(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp2.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp2.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp2.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp2.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode2(str, decode3) {
      try {
        return decode3(str);
      } catch (e2) {
        return str;
      }
    }
  }
});

// node_modules/@lukeed/uuid/dist/index.mjs
function v4() {
  var i2 = 0, num, out = "";
  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = Array(i2 = 256);
    while (i2--)
      BUFFER[i2] = 256 * Math.random() | 0;
    i2 = IDX = 0;
  }
  for (; i2 < 16; i2++) {
    num = BUFFER[IDX + i2];
    if (i2 == 6)
      out += HEX[num & 15 | 64];
    else if (i2 == 8)
      out += HEX[num & 63 | 128];
    else
      out += HEX[num];
    if (i2 & 1 && i2 > 1 && i2 < 11)
      out += "-";
  }
  IDX++;
  return out;
}
var IDX, HEX, BUFFER;
var init_dist = __esm({
  "node_modules/@lukeed/uuid/dist/index.mjs"() {
    IDX = 256;
    HEX = [];
    while (IDX--)
      HEX[IDX] = (IDX + 256).toString(16).substring(1);
  }
});

// .svelte-kit/output/server/chunks/hooks-5b953b47.js
var hooks_5b953b47_exports = {};
__export(hooks_5b953b47_exports, {
  handle: () => handle
});
var import_cookie, handle;
var init_hooks_5b953b47 = __esm({
  ".svelte-kit/output/server/chunks/hooks-5b953b47.js"() {
    import_cookie = __toESM(require_cookie(), 1);
    init_dist();
    handle = async ({ event, resolve: resolve2 }) => {
      const cookies = import_cookie.default.parse(event.request.headers.get("cookie") || "");
      event.locals.userid = cookies.userid || v4();
      const response = await resolve2(event);
      if (!cookies.userid) {
        response.headers.set("set-cookie", import_cookie.default.serialize("userid", event.locals.userid, {
          path: "/",
          httpOnly: true
        }));
      }
      return response;
    };
  }
});

// .svelte-kit/output/server/chunks/env-0d653bb5.js
function writable2(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue2.length; i2 += 2) {
            subscriber_queue2[i2][0](subscriber_queue2[i2 + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue2, beginner, wishPhase, pageActive, backsound, muted, isLoaded, showDisclaimer, patchVersion, bannerPhase, bannerActive, showBeginner, isFatepointSystem, fatePoint, showFatepointPopup, selectedCourse, isAcquaintUsed, viewportWidth, viewportHeight, isMobile, mobileMode, bannerList, genesis, stardust, starglitter, primogem, intertwined, acquaint, unlimitedFates, query, HOST, DESCRIPTION, KEYWORDS;
var init_env_0d653bb5 = __esm({
  ".svelte-kit/output/server/chunks/env-0d653bb5.js"() {
    init_index_437e72a6();
    subscriber_queue2 = [];
    beginner = {
      name: "beginner",
      character: "noelle",
      vision: "geo",
      buttonBoxPosition: {
        w: 100,
        t: 30
      }
    };
    wishPhase = 1;
    pageActive = writable2("index");
    backsound = writable2(false);
    muted = writable2(false);
    isLoaded = writable2(false);
    showDisclaimer = writable2(true);
    patchVersion = writable2(0);
    bannerPhase = writable2(wishPhase);
    bannerActive = writable2(0);
    showBeginner = writable2(true);
    isFatepointSystem = writable2(false);
    fatePoint = writable2(0);
    showFatepointPopup = writable2(false);
    selectedCourse = writable2({});
    isAcquaintUsed = writable2(true);
    viewportWidth = writable2(0);
    viewportHeight = writable2(0);
    isMobile = writable2(false);
    mobileMode = writable2(false);
    bannerList = writable2([{ type: "beginner", character: beginner }]);
    genesis = writable2(0);
    stardust = writable2(0);
    starglitter = writable2(0);
    primogem = writable2(1600);
    intertwined = writable2(0);
    acquaint = writable2(0);
    unlimitedFates = writable2(false);
    query = writable2("");
    HOST = "http://domain.com";
    DESCRIPTION = "This is Description";
    KEYWORDS = "This is Keywords";
  }
});

// node_modules/overlayscrollbars/js/OverlayScrollbars.js
var require_OverlayScrollbars = __commonJS({
  "node_modules/overlayscrollbars/js/OverlayScrollbars.js"(exports, module2) {
    (function(global2, factory) {
      if (typeof define === "function" && define.amd)
        define(function() {
          return factory(global2, global2.document, void 0);
        });
      else if (typeof module2 === "object" && typeof module2.exports === "object")
        module2.exports = factory(global2, global2.document, void 0);
      else
        factory(global2, global2.document, void 0);
    })(typeof window !== "undefined" ? window : exports, function(window2, document2, undefined2) {
      "use strict";
      var PLUGINNAME = "OverlayScrollbars";
      var TYPES = {
        o: "object",
        f: "function",
        a: "array",
        s: "string",
        b: "boolean",
        n: "number",
        u: "undefined",
        z: "null"
      };
      var LEXICON = {
        c: "class",
        s: "style",
        i: "id",
        l: "length",
        p: "prototype",
        ti: "tabindex",
        oH: "offsetHeight",
        cH: "clientHeight",
        sH: "scrollHeight",
        oW: "offsetWidth",
        cW: "clientWidth",
        sW: "scrollWidth",
        hOP: "hasOwnProperty",
        bCR: "getBoundingClientRect"
      };
      var VENDORS = function() {
        var jsCache = {};
        var cssCache = {};
        var cssPrefixes = ["-webkit-", "-moz-", "-o-", "-ms-"];
        var jsPrefixes = ["WebKit", "Moz", "O", "MS"];
        function firstLetterToUpper(str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return {
          _cssPrefixes: cssPrefixes,
          _jsPrefixes: jsPrefixes,
          _cssProperty: function(name) {
            var result = cssCache[name];
            if (cssCache[LEXICON.hOP](name))
              return result;
            var uppercasedName = firstLetterToUpper(name);
            var elmStyle = document2.createElement("div")[LEXICON.s];
            var resultPossibilities;
            var i2 = 0;
            var v;
            var currVendorWithoutDashes;
            for (; i2 < cssPrefixes.length; i2++) {
              currVendorWithoutDashes = cssPrefixes[i2].replace(/-/g, "");
              resultPossibilities = [
                name,
                cssPrefixes[i2] + name,
                currVendorWithoutDashes + uppercasedName,
                firstLetterToUpper(currVendorWithoutDashes) + uppercasedName
              ];
              for (v = 0; v < resultPossibilities[LEXICON.l]; v++) {
                if (elmStyle[resultPossibilities[v]] !== undefined2) {
                  result = resultPossibilities[v];
                  break;
                }
              }
            }
            cssCache[name] = result;
            return result;
          },
          _cssPropertyValue: function(property, values, suffix) {
            var name = property + " " + values;
            var result = cssCache[name];
            if (cssCache[LEXICON.hOP](name))
              return result;
            var dummyStyle = document2.createElement("div")[LEXICON.s];
            var possbleValues = values.split(" ");
            var preparedSuffix = suffix || "";
            var i2 = 0;
            var v = -1;
            var prop;
            for (; i2 < possbleValues[LEXICON.l]; i2++) {
              for (; v < VENDORS._cssPrefixes[LEXICON.l]; v++) {
                prop = v < 0 ? possbleValues[i2] : VENDORS._cssPrefixes[v] + possbleValues[i2];
                dummyStyle.cssText = property + ":" + prop + preparedSuffix;
                if (dummyStyle[LEXICON.l]) {
                  result = prop;
                  break;
                }
              }
            }
            cssCache[name] = result;
            return result;
          },
          _jsAPI: function(name, isInterface, fallback) {
            var i2 = 0;
            var result = jsCache[name];
            if (!jsCache[LEXICON.hOP](name)) {
              result = window2[name];
              for (; i2 < jsPrefixes[LEXICON.l]; i2++)
                result = result || window2[(isInterface ? jsPrefixes[i2] : jsPrefixes[i2].toLowerCase()) + firstLetterToUpper(name)];
              jsCache[name] = result;
            }
            return result || fallback;
          }
        };
      }();
      var COMPATIBILITY = function() {
        function windowSize(x2) {
          return x2 ? window2.innerWidth || document2.documentElement[LEXICON.cW] || document2.body[LEXICON.cW] : window2.innerHeight || document2.documentElement[LEXICON.cH] || document2.body[LEXICON.cH];
        }
        function bind(func, thisObj) {
          if (typeof func != TYPES.f) {
            throw "Can't bind function!";
          }
          var proto = LEXICON.p;
          var aArgs = Array[proto].slice.call(arguments, 2);
          var fNOP = function() {
          };
          var fBound = function() {
            return func.apply(this instanceof fNOP ? this : thisObj, aArgs.concat(Array[proto].slice.call(arguments)));
          };
          if (func[proto])
            fNOP[proto] = func[proto];
          fBound[proto] = new fNOP();
          return fBound;
        }
        return {
          wW: bind(windowSize, 0, true),
          wH: bind(windowSize, 0),
          mO: bind(VENDORS._jsAPI, 0, "MutationObserver", true),
          rO: bind(VENDORS._jsAPI, 0, "ResizeObserver", true),
          rAF: bind(VENDORS._jsAPI, 0, "requestAnimationFrame", false, function(func) {
            return window2.setTimeout(func, 1e3 / 60);
          }),
          cAF: bind(VENDORS._jsAPI, 0, "cancelAnimationFrame", false, function(id) {
            return window2.clearTimeout(id);
          }),
          now: function() {
            return Date.now && Date.now() || new Date().getTime();
          },
          stpP: function(event) {
            if (event.stopPropagation)
              event.stopPropagation();
            else
              event.cancelBubble = true;
          },
          prvD: function(event) {
            if (event.preventDefault && event.cancelable)
              event.preventDefault();
            else
              event.returnValue = false;
          },
          page: function(event) {
            event = event.originalEvent || event;
            var strPage = "page";
            var strClient = "client";
            var strX = "X";
            var strY = "Y";
            var target = event.target || event.srcElement || document2;
            var eventDoc = target.ownerDocument || document2;
            var doc = eventDoc.documentElement;
            var body = eventDoc.body;
            if (event.touches !== undefined2) {
              var touch = event.touches[0];
              return {
                x: touch[strPage + strX],
                y: touch[strPage + strY]
              };
            }
            if (!event[strPage + strX] && event[strClient + strX] && event[strClient + strX] != null) {
              return {
                x: event[strClient + strX] + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0),
                y: event[strClient + strY] + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
              };
            }
            return {
              x: event[strPage + strX],
              y: event[strPage + strY]
            };
          },
          mBtn: function(event) {
            var button = event.button;
            if (!event.which && button !== undefined2)
              return button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
            else
              return event.which;
          },
          inA: function(item, arr) {
            for (var i2 = 0; i2 < arr[LEXICON.l]; i2++)
              try {
                if (arr[i2] === item)
                  return i2;
              } catch (e2) {
              }
            return -1;
          },
          isA: function(arr) {
            var def = Array.isArray;
            return def ? def(arr) : this.type(arr) == TYPES.a;
          },
          type: function(obj) {
            if (obj === undefined2)
              return obj + "";
            if (obj === null)
              return obj + "";
            return Object[LEXICON.p].toString.call(obj).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
          },
          bind
        };
      }();
      var MATH = Math;
      var JQUERY = window2.jQuery;
      var EASING = function() {
        var _easingsMath = {
          p: MATH.PI,
          c: MATH.cos,
          s: MATH.sin,
          w: MATH.pow,
          t: MATH.sqrt,
          n: MATH.asin,
          a: MATH.abs,
          o: 1.70158
        };
        return {
          swing: function(x2, t2, b, c, d) {
            return 0.5 - _easingsMath.c(x2 * _easingsMath.p) / 2;
          },
          linear: function(x2, t2, b, c, d) {
            return x2;
          },
          easeInQuad: function(x2, t2, b, c, d) {
            return c * (t2 /= d) * t2 + b;
          },
          easeOutQuad: function(x2, t2, b, c, d) {
            return -c * (t2 /= d) * (t2 - 2) + b;
          },
          easeInOutQuad: function(x2, t2, b, c, d) {
            return (t2 /= d / 2) < 1 ? c / 2 * t2 * t2 + b : -c / 2 * (--t2 * (t2 - 2) - 1) + b;
          },
          easeInCubic: function(x2, t2, b, c, d) {
            return c * (t2 /= d) * t2 * t2 + b;
          },
          easeOutCubic: function(x2, t2, b, c, d) {
            return c * ((t2 = t2 / d - 1) * t2 * t2 + 1) + b;
          },
          easeInOutCubic: function(x2, t2, b, c, d) {
            return (t2 /= d / 2) < 1 ? c / 2 * t2 * t2 * t2 + b : c / 2 * ((t2 -= 2) * t2 * t2 + 2) + b;
          },
          easeInQuart: function(x2, t2, b, c, d) {
            return c * (t2 /= d) * t2 * t2 * t2 + b;
          },
          easeOutQuart: function(x2, t2, b, c, d) {
            return -c * ((t2 = t2 / d - 1) * t2 * t2 * t2 - 1) + b;
          },
          easeInOutQuart: function(x2, t2, b, c, d) {
            return (t2 /= d / 2) < 1 ? c / 2 * t2 * t2 * t2 * t2 + b : -c / 2 * ((t2 -= 2) * t2 * t2 * t2 - 2) + b;
          },
          easeInQuint: function(x2, t2, b, c, d) {
            return c * (t2 /= d) * t2 * t2 * t2 * t2 + b;
          },
          easeOutQuint: function(x2, t2, b, c, d) {
            return c * ((t2 = t2 / d - 1) * t2 * t2 * t2 * t2 + 1) + b;
          },
          easeInOutQuint: function(x2, t2, b, c, d) {
            return (t2 /= d / 2) < 1 ? c / 2 * t2 * t2 * t2 * t2 * t2 + b : c / 2 * ((t2 -= 2) * t2 * t2 * t2 * t2 + 2) + b;
          },
          easeInSine: function(x2, t2, b, c, d) {
            return -c * _easingsMath.c(t2 / d * (_easingsMath.p / 2)) + c + b;
          },
          easeOutSine: function(x2, t2, b, c, d) {
            return c * _easingsMath.s(t2 / d * (_easingsMath.p / 2)) + b;
          },
          easeInOutSine: function(x2, t2, b, c, d) {
            return -c / 2 * (_easingsMath.c(_easingsMath.p * t2 / d) - 1) + b;
          },
          easeInExpo: function(x2, t2, b, c, d) {
            return t2 == 0 ? b : c * _easingsMath.w(2, 10 * (t2 / d - 1)) + b;
          },
          easeOutExpo: function(x2, t2, b, c, d) {
            return t2 == d ? b + c : c * (-_easingsMath.w(2, -10 * t2 / d) + 1) + b;
          },
          easeInOutExpo: function(x2, t2, b, c, d) {
            if (t2 == 0)
              return b;
            if (t2 == d)
              return b + c;
            if ((t2 /= d / 2) < 1)
              return c / 2 * _easingsMath.w(2, 10 * (t2 - 1)) + b;
            return c / 2 * (-_easingsMath.w(2, -10 * --t2) + 2) + b;
          },
          easeInCirc: function(x2, t2, b, c, d) {
            return -c * (_easingsMath.t(1 - (t2 /= d) * t2) - 1) + b;
          },
          easeOutCirc: function(x2, t2, b, c, d) {
            return c * _easingsMath.t(1 - (t2 = t2 / d - 1) * t2) + b;
          },
          easeInOutCirc: function(x2, t2, b, c, d) {
            return (t2 /= d / 2) < 1 ? -c / 2 * (_easingsMath.t(1 - t2 * t2) - 1) + b : c / 2 * (_easingsMath.t(1 - (t2 -= 2) * t2) + 1) + b;
          },
          easeInElastic: function(x2, t2, b, c, d) {
            var s3 = _easingsMath.o;
            var p = 0;
            var a = c;
            if (t2 == 0)
              return b;
            if ((t2 /= d) == 1)
              return b + c;
            if (!p)
              p = d * 0.3;
            if (a < _easingsMath.a(c)) {
              a = c;
              s3 = p / 4;
            } else
              s3 = p / (2 * _easingsMath.p) * _easingsMath.n(c / a);
            return -(a * _easingsMath.w(2, 10 * (t2 -= 1)) * _easingsMath.s((t2 * d - s3) * (2 * _easingsMath.p) / p)) + b;
          },
          easeOutElastic: function(x2, t2, b, c, d) {
            var s3 = _easingsMath.o;
            var p = 0;
            var a = c;
            if (t2 == 0)
              return b;
            if ((t2 /= d) == 1)
              return b + c;
            if (!p)
              p = d * 0.3;
            if (a < _easingsMath.a(c)) {
              a = c;
              s3 = p / 4;
            } else
              s3 = p / (2 * _easingsMath.p) * _easingsMath.n(c / a);
            return a * _easingsMath.w(2, -10 * t2) * _easingsMath.s((t2 * d - s3) * (2 * _easingsMath.p) / p) + c + b;
          },
          easeInOutElastic: function(x2, t2, b, c, d) {
            var s3 = _easingsMath.o;
            var p = 0;
            var a = c;
            if (t2 == 0)
              return b;
            if ((t2 /= d / 2) == 2)
              return b + c;
            if (!p)
              p = d * (0.3 * 1.5);
            if (a < _easingsMath.a(c)) {
              a = c;
              s3 = p / 4;
            } else
              s3 = p / (2 * _easingsMath.p) * _easingsMath.n(c / a);
            if (t2 < 1)
              return -0.5 * (a * _easingsMath.w(2, 10 * (t2 -= 1)) * _easingsMath.s((t2 * d - s3) * (2 * _easingsMath.p) / p)) + b;
            return a * _easingsMath.w(2, -10 * (t2 -= 1)) * _easingsMath.s((t2 * d - s3) * (2 * _easingsMath.p) / p) * 0.5 + c + b;
          },
          easeInBack: function(x2, t2, b, c, d, s3) {
            s3 = s3 || _easingsMath.o;
            return c * (t2 /= d) * t2 * ((s3 + 1) * t2 - s3) + b;
          },
          easeOutBack: function(x2, t2, b, c, d, s3) {
            s3 = s3 || _easingsMath.o;
            return c * ((t2 = t2 / d - 1) * t2 * ((s3 + 1) * t2 + s3) + 1) + b;
          },
          easeInOutBack: function(x2, t2, b, c, d, s3) {
            s3 = s3 || _easingsMath.o;
            return (t2 /= d / 2) < 1 ? c / 2 * (t2 * t2 * (((s3 *= 1.525) + 1) * t2 - s3)) + b : c / 2 * ((t2 -= 2) * t2 * (((s3 *= 1.525) + 1) * t2 + s3) + 2) + b;
          },
          easeInBounce: function(x2, t2, b, c, d) {
            return c - this.easeOutBounce(x2, d - t2, 0, c, d) + b;
          },
          easeOutBounce: function(x2, t2, b, c, d) {
            var o = 7.5625;
            if ((t2 /= d) < 1 / 2.75) {
              return c * (o * t2 * t2) + b;
            } else if (t2 < 2 / 2.75) {
              return c * (o * (t2 -= 1.5 / 2.75) * t2 + 0.75) + b;
            } else if (t2 < 2.5 / 2.75) {
              return c * (o * (t2 -= 2.25 / 2.75) * t2 + 0.9375) + b;
            } else {
              return c * (o * (t2 -= 2.625 / 2.75) * t2 + 0.984375) + b;
            }
          },
          easeInOutBounce: function(x2, t2, b, c, d) {
            return t2 < d / 2 ? this.easeInBounce(x2, t2 * 2, 0, c, d) * 0.5 + b : this.easeOutBounce(x2, t2 * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
          }
        };
      }();
      var FRAMEWORK = function() {
        var _rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
        var _strSpace = " ";
        var _strEmpty = "";
        var _strScrollLeft = "scrollLeft";
        var _strScrollTop = "scrollTop";
        var _animations = [];
        var _type2 = COMPATIBILITY.type;
        var _cssNumber = {
          animationIterationCount: true,
          columnCount: true,
          fillOpacity: true,
          flexGrow: true,
          flexShrink: true,
          fontWeight: true,
          lineHeight: true,
          opacity: true,
          order: true,
          orphans: true,
          widows: true,
          zIndex: true,
          zoom: true
        };
        function extend() {
          var src, copyIsArray, copy, name, options, clone2, target = arguments[0] || {}, i2 = 1, length2 = arguments[LEXICON.l], deep = false;
          if (_type2(target) == TYPES.b) {
            deep = target;
            target = arguments[1] || {};
            i2 = 2;
          }
          if (_type2(target) != TYPES.o && !_type2(target) == TYPES.f) {
            target = {};
          }
          if (length2 === i2) {
            target = FakejQuery;
            --i2;
          }
          for (; i2 < length2; i2++) {
            if ((options = arguments[i2]) != null) {
              for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                  continue;
                }
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = COMPATIBILITY.isA(copy)))) {
                  if (copyIsArray) {
                    copyIsArray = false;
                    clone2 = src && COMPATIBILITY.isA(src) ? src : [];
                  } else {
                    clone2 = src && isPlainObject(src) ? src : {};
                  }
                  target[name] = extend(deep, clone2, copy);
                } else if (copy !== undefined2) {
                  target[name] = copy;
                }
              }
            }
          }
          return target;
        }
        ;
        function inArray(item, arr, fromIndex) {
          for (var i2 = fromIndex || 0; i2 < arr[LEXICON.l]; i2++)
            if (arr[i2] === item)
              return i2;
          return -1;
        }
        function isFunction(obj) {
          return _type2(obj) == TYPES.f;
        }
        ;
        function isEmptyObject(obj) {
          for (var name in obj)
            return false;
          return true;
        }
        ;
        function isPlainObject(obj) {
          if (!obj || _type2(obj) != TYPES.o)
            return false;
          var key2;
          var proto = LEXICON.p;
          var hasOwnProperty = Object[proto].hasOwnProperty;
          var hasOwnConstructor = hasOwnProperty.call(obj, "constructor");
          var hasIsPrototypeOf = obj.constructor && obj.constructor[proto] && hasOwnProperty.call(obj.constructor[proto], "isPrototypeOf");
          if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
            return false;
          }
          for (key2 in obj) {
          }
          return _type2(key2) == TYPES.u || hasOwnProperty.call(obj, key2);
        }
        ;
        function each2(obj, callback) {
          var i2 = 0;
          if (isArrayLike(obj)) {
            for (; i2 < obj[LEXICON.l]; i2++) {
              if (callback.call(obj[i2], i2, obj[i2]) === false)
                break;
            }
          } else {
            for (i2 in obj) {
              if (callback.call(obj[i2], i2, obj[i2]) === false)
                break;
            }
          }
          return obj;
        }
        ;
        function isArrayLike(obj) {
          var length2 = !!obj && [LEXICON.l] in obj && obj[LEXICON.l];
          var t2 = _type2(obj);
          return isFunction(t2) ? false : t2 == TYPES.a || length2 === 0 || _type2(length2) == TYPES.n && length2 > 0 && length2 - 1 in obj;
        }
        function stripAndCollapse(value) {
          var tokens = value.match(_rnothtmlwhite) || [];
          return tokens.join(_strSpace);
        }
        function matches(elem, selector) {
          var nodeList = (elem.parentNode || document2).querySelectorAll(selector) || [];
          var i2 = nodeList[LEXICON.l];
          while (i2--)
            if (nodeList[i2] == elem)
              return true;
          return false;
        }
        function insertAdjacentElement(el, strategy, child) {
          if (COMPATIBILITY.isA(child)) {
            for (var i2 = 0; i2 < child[LEXICON.l]; i2++)
              insertAdjacentElement(el, strategy, child[i2]);
          } else if (_type2(child) == TYPES.s)
            el.insertAdjacentHTML(strategy, child);
          else
            el.insertAdjacentElement(strategy, child.nodeType ? child : child[0]);
        }
        function setCSSVal(el, prop, val) {
          try {
            if (el[LEXICON.s][prop] !== undefined2)
              el[LEXICON.s][prop] = parseCSSVal(prop, val);
          } catch (e2) {
          }
        }
        function parseCSSVal(prop, val) {
          if (!_cssNumber[prop.toLowerCase()] && _type2(val) == TYPES.n)
            val += "px";
          return val;
        }
        function startNextAnimationInQ(animObj, removeFromQ) {
          var index;
          var nextAnim;
          if (removeFromQ !== false)
            animObj.q.splice(0, 1);
          if (animObj.q[LEXICON.l] > 0) {
            nextAnim = animObj.q[0];
            animate(animObj.el, nextAnim.props, nextAnim.duration, nextAnim.easing, nextAnim.complete, true);
          } else {
            index = inArray(animObj, _animations);
            if (index > -1)
              _animations.splice(index, 1);
          }
        }
        function setAnimationValue(el, prop, value) {
          if (prop === _strScrollLeft || prop === _strScrollTop)
            el[prop] = value;
          else
            setCSSVal(el, prop, value);
        }
        function animate(el, props, options, easing, complete, guaranteedNext) {
          var hasOptions = isPlainObject(options);
          var from = {};
          var to = {};
          var i2 = 0;
          var key2;
          var animObj;
          var start;
          var progress;
          var step;
          var specialEasing;
          var duration;
          if (hasOptions) {
            easing = options.easing;
            start = options.start;
            progress = options.progress;
            step = options.step;
            specialEasing = options.specialEasing;
            complete = options.complete;
            duration = options.duration;
          } else
            duration = options;
          specialEasing = specialEasing || {};
          duration = duration || 400;
          easing = easing || "swing";
          guaranteedNext = guaranteedNext || false;
          for (; i2 < _animations[LEXICON.l]; i2++) {
            if (_animations[i2].el === el) {
              animObj = _animations[i2];
              break;
            }
          }
          if (!animObj) {
            animObj = {
              el,
              q: []
            };
            _animations.push(animObj);
          }
          for (key2 in props) {
            if (key2 === _strScrollLeft || key2 === _strScrollTop)
              from[key2] = el[key2];
            else
              from[key2] = FakejQuery(el).css(key2);
          }
          for (key2 in from) {
            if (from[key2] !== props[key2] && props[key2] !== undefined2)
              to[key2] = props[key2];
          }
          if (!isEmptyObject(to)) {
            var timeNow;
            var end;
            var percent;
            var fromVal;
            var toVal;
            var easedVal;
            var timeStart;
            var frame;
            var elapsed;
            var qPos = guaranteedNext ? 0 : inArray(qObj, animObj.q);
            var qObj = {
              props: to,
              duration: hasOptions ? options : duration,
              easing,
              complete
            };
            if (qPos === -1) {
              qPos = animObj.q[LEXICON.l];
              animObj.q.push(qObj);
            }
            if (qPos === 0) {
              if (duration > 0) {
                timeStart = COMPATIBILITY.now();
                frame = function() {
                  timeNow = COMPATIBILITY.now();
                  elapsed = timeNow - timeStart;
                  end = qObj.stop || elapsed >= duration;
                  percent = 1 - (MATH.max(0, timeStart + duration - timeNow) / duration || 0);
                  for (key2 in to) {
                    fromVal = parseFloat(from[key2]);
                    toVal = parseFloat(to[key2]);
                    easedVal = (toVal - fromVal) * EASING[specialEasing[key2] || easing](percent, percent * duration, 0, 1, duration) + fromVal;
                    setAnimationValue(el, key2, easedVal);
                    if (isFunction(step)) {
                      step(easedVal, {
                        elem: el,
                        prop: key2,
                        start: fromVal,
                        now: easedVal,
                        end: toVal,
                        pos: percent,
                        options: {
                          easing,
                          speacialEasing: specialEasing,
                          duration,
                          complete,
                          step
                        },
                        startTime: timeStart
                      });
                    }
                  }
                  if (isFunction(progress))
                    progress({}, percent, MATH.max(0, duration - elapsed));
                  if (end) {
                    startNextAnimationInQ(animObj);
                    if (isFunction(complete))
                      complete();
                  } else
                    qObj.frame = COMPATIBILITY.rAF()(frame);
                };
                qObj.frame = COMPATIBILITY.rAF()(frame);
              } else {
                for (key2 in to)
                  setAnimationValue(el, key2, to[key2]);
                startNextAnimationInQ(animObj);
              }
            }
          } else if (guaranteedNext)
            startNextAnimationInQ(animObj);
        }
        function stop(el, clearQ, jumpToEnd) {
          var animObj;
          var qObj;
          var key2;
          var i2 = 0;
          for (; i2 < _animations[LEXICON.l]; i2++) {
            animObj = _animations[i2];
            if (animObj.el === el) {
              if (animObj.q[LEXICON.l] > 0) {
                qObj = animObj.q[0];
                qObj.stop = true;
                COMPATIBILITY.cAF()(qObj.frame);
                animObj.q.splice(0, 1);
                if (jumpToEnd)
                  for (key2 in qObj.props)
                    setAnimationValue(el, key2, qObj.props[key2]);
                if (clearQ)
                  animObj.q = [];
                else
                  startNextAnimationInQ(animObj, false);
              }
              break;
            }
          }
        }
        function elementIsVisible(el) {
          return !!(el[LEXICON.oW] || el[LEXICON.oH] || el.getClientRects()[LEXICON.l]);
        }
        function FakejQuery(selector) {
          if (arguments[LEXICON.l] === 0)
            return this;
          var base2 = new FakejQuery();
          var elements = selector;
          var i2 = 0;
          var elms;
          var el;
          if (_type2(selector) == TYPES.s) {
            elements = [];
            if (selector.charAt(0) === "<") {
              el = document2.createElement("div");
              el.innerHTML = selector;
              elms = el.children;
            } else {
              elms = document2.querySelectorAll(selector);
            }
            for (; i2 < elms[LEXICON.l]; i2++)
              elements.push(elms[i2]);
          }
          if (elements) {
            if (_type2(elements) != TYPES.s && (!isArrayLike(elements) || elements === window2 || elements === elements.self))
              elements = [elements];
            for (i2 = 0; i2 < elements[LEXICON.l]; i2++)
              base2[i2] = elements[i2];
            base2[LEXICON.l] = elements[LEXICON.l];
          }
          return base2;
        }
        ;
        FakejQuery[LEXICON.p] = {
          on: function(eventName, handler) {
            eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];
            var eventNameLength = eventName[LEXICON.l];
            var i2 = 0;
            var el;
            return this.each(function() {
              el = this;
              try {
                if (el.addEventListener) {
                  for (; i2 < eventNameLength; i2++)
                    el.addEventListener(eventName[i2], handler);
                } else if (el.detachEvent) {
                  for (; i2 < eventNameLength; i2++)
                    el.attachEvent("on" + eventName[i2], handler);
                }
              } catch (e2) {
              }
            });
          },
          off: function(eventName, handler) {
            eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];
            var eventNameLength = eventName[LEXICON.l];
            var i2 = 0;
            var el;
            return this.each(function() {
              el = this;
              try {
                if (el.removeEventListener) {
                  for (; i2 < eventNameLength; i2++)
                    el.removeEventListener(eventName[i2], handler);
                } else if (el.detachEvent) {
                  for (; i2 < eventNameLength; i2++)
                    el.detachEvent("on" + eventName[i2], handler);
                }
              } catch (e2) {
              }
            });
          },
          one: function(eventName, handler) {
            eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];
            return this.each(function() {
              var el = FakejQuery(this);
              FakejQuery.each(eventName, function(i2, oneEventName) {
                var oneHandler = function(e2) {
                  handler.call(this, e2);
                  el.off(oneEventName, oneHandler);
                };
                el.on(oneEventName, oneHandler);
              });
            });
          },
          trigger: function(eventName) {
            var el;
            var event;
            return this.each(function() {
              el = this;
              if (document2.createEvent) {
                event = document2.createEvent("HTMLEvents");
                event.initEvent(eventName, true, false);
                el.dispatchEvent(event);
              } else {
                el.fireEvent("on" + eventName);
              }
            });
          },
          append: function(child) {
            return this.each(function() {
              insertAdjacentElement(this, "beforeend", child);
            });
          },
          prepend: function(child) {
            return this.each(function() {
              insertAdjacentElement(this, "afterbegin", child);
            });
          },
          before: function(child) {
            return this.each(function() {
              insertAdjacentElement(this, "beforebegin", child);
            });
          },
          after: function(child) {
            return this.each(function() {
              insertAdjacentElement(this, "afterend", child);
            });
          },
          remove: function() {
            return this.each(function() {
              var el = this;
              var parentNode = el.parentNode;
              if (parentNode != null)
                parentNode.removeChild(el);
            });
          },
          unwrap: function() {
            var parents = [];
            var i2;
            var el;
            var parent;
            this.each(function() {
              parent = this.parentNode;
              if (inArray(parent, parents) === -1)
                parents.push(parent);
            });
            for (i2 = 0; i2 < parents[LEXICON.l]; i2++) {
              el = parents[i2];
              parent = el.parentNode;
              while (el.firstChild)
                parent.insertBefore(el.firstChild, el);
              parent.removeChild(el);
            }
            return this;
          },
          wrapAll: function(wrapperHTML) {
            var i2;
            var nodes = this;
            var wrapper = FakejQuery(wrapperHTML)[0];
            var deepest = wrapper;
            var parent = nodes[0].parentNode;
            var previousSibling = nodes[0].previousSibling;
            while (deepest.childNodes[LEXICON.l] > 0)
              deepest = deepest.childNodes[0];
            for (i2 = 0; nodes[LEXICON.l] - i2; deepest.firstChild === nodes[0] && i2++)
              deepest.appendChild(nodes[i2]);
            var nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild;
            parent.insertBefore(wrapper, nextSibling);
            return this;
          },
          wrapInner: function(wrapperHTML) {
            return this.each(function() {
              var el = FakejQuery(this);
              var contents = el.contents();
              if (contents[LEXICON.l])
                contents.wrapAll(wrapperHTML);
              else
                el.append(wrapperHTML);
            });
          },
          wrap: function(wrapperHTML) {
            return this.each(function() {
              FakejQuery(this).wrapAll(wrapperHTML);
            });
          },
          css: function(styles, val) {
            var el;
            var key2;
            var cptStyle;
            var getCptStyle = window2.getComputedStyle;
            if (_type2(styles) == TYPES.s) {
              if (val === undefined2) {
                el = this[0];
                cptStyle = getCptStyle ? getCptStyle(el, null) : el.currentStyle[styles];
                return getCptStyle ? cptStyle != null ? cptStyle.getPropertyValue(styles) : el[LEXICON.s][styles] : cptStyle;
              } else {
                return this.each(function() {
                  setCSSVal(this, styles, val);
                });
              }
            } else {
              return this.each(function() {
                for (key2 in styles)
                  setCSSVal(this, key2, styles[key2]);
              });
            }
          },
          hasClass: function(className) {
            var elem, i2 = 0;
            var classNamePrepared = _strSpace + className + _strSpace;
            var classList;
            while (elem = this[i2++]) {
              classList = elem.classList;
              if (classList && classList.contains(className))
                return true;
              else if (elem.nodeType === 1 && (_strSpace + stripAndCollapse(elem.className + _strEmpty) + _strSpace).indexOf(classNamePrepared) > -1)
                return true;
            }
            return false;
          },
          addClass: function(className) {
            var classes;
            var elem;
            var cur;
            var curValue;
            var clazz;
            var finalValue;
            var supportClassList;
            var elmClassList;
            var i2 = 0;
            var v = 0;
            if (className) {
              classes = className.match(_rnothtmlwhite) || [];
              while (elem = this[i2++]) {
                elmClassList = elem.classList;
                if (supportClassList === undefined2)
                  supportClassList = elmClassList !== undefined2;
                if (supportClassList) {
                  while (clazz = classes[v++])
                    elmClassList.add(clazz);
                } else {
                  curValue = elem.className + _strEmpty;
                  cur = elem.nodeType === 1 && _strSpace + stripAndCollapse(curValue) + _strSpace;
                  if (cur) {
                    while (clazz = classes[v++])
                      if (cur.indexOf(_strSpace + clazz + _strSpace) < 0)
                        cur += clazz + _strSpace;
                    finalValue = stripAndCollapse(cur);
                    if (curValue !== finalValue)
                      elem.className = finalValue;
                  }
                }
              }
            }
            return this;
          },
          removeClass: function(className) {
            var classes;
            var elem;
            var cur;
            var curValue;
            var clazz;
            var finalValue;
            var supportClassList;
            var elmClassList;
            var i2 = 0;
            var v = 0;
            if (className) {
              classes = className.match(_rnothtmlwhite) || [];
              while (elem = this[i2++]) {
                elmClassList = elem.classList;
                if (supportClassList === undefined2)
                  supportClassList = elmClassList !== undefined2;
                if (supportClassList) {
                  while (clazz = classes[v++])
                    elmClassList.remove(clazz);
                } else {
                  curValue = elem.className + _strEmpty;
                  cur = elem.nodeType === 1 && _strSpace + stripAndCollapse(curValue) + _strSpace;
                  if (cur) {
                    while (clazz = classes[v++])
                      while (cur.indexOf(_strSpace + clazz + _strSpace) > -1)
                        cur = cur.replace(_strSpace + clazz + _strSpace, _strSpace);
                    finalValue = stripAndCollapse(cur);
                    if (curValue !== finalValue)
                      elem.className = finalValue;
                  }
                }
              }
            }
            return this;
          },
          hide: function() {
            return this.each(function() {
              this[LEXICON.s].display = "none";
            });
          },
          show: function() {
            return this.each(function() {
              this[LEXICON.s].display = "block";
            });
          },
          attr: function(attrName, value) {
            var i2 = 0;
            var el;
            while (el = this[i2++]) {
              if (value === undefined2)
                return el.getAttribute(attrName);
              el.setAttribute(attrName, value);
            }
            return this;
          },
          removeAttr: function(attrName) {
            return this.each(function() {
              this.removeAttribute(attrName);
            });
          },
          offset: function() {
            var el = this[0];
            var rect = el[LEXICON.bCR]();
            var scrollLeft = window2.pageXOffset || document2.documentElement[_strScrollLeft];
            var scrollTop = window2.pageYOffset || document2.documentElement[_strScrollTop];
            return {
              top: rect.top + scrollTop,
              left: rect.left + scrollLeft
            };
          },
          position: function() {
            var el = this[0];
            return {
              top: el.offsetTop,
              left: el.offsetLeft
            };
          },
          scrollLeft: function(value) {
            var i2 = 0;
            var el;
            while (el = this[i2++]) {
              if (value === undefined2)
                return el[_strScrollLeft];
              el[_strScrollLeft] = value;
            }
            return this;
          },
          scrollTop: function(value) {
            var i2 = 0;
            var el;
            while (el = this[i2++]) {
              if (value === undefined2)
                return el[_strScrollTop];
              el[_strScrollTop] = value;
            }
            return this;
          },
          val: function(value) {
            var el = this[0];
            if (!value)
              return el.value;
            el.value = value;
            return this;
          },
          first: function() {
            return this.eq(0);
          },
          last: function() {
            return this.eq(-1);
          },
          eq: function(index) {
            return FakejQuery(this[index >= 0 ? index : this[LEXICON.l] + index]);
          },
          find: function(selector) {
            var children = [];
            var i2;
            this.each(function() {
              var el = this;
              var ch = el.querySelectorAll(selector);
              for (i2 = 0; i2 < ch[LEXICON.l]; i2++)
                children.push(ch[i2]);
            });
            return FakejQuery(children);
          },
          children: function(selector) {
            var children = [];
            var el;
            var ch;
            var i2;
            this.each(function() {
              ch = this.children;
              for (i2 = 0; i2 < ch[LEXICON.l]; i2++) {
                el = ch[i2];
                if (selector) {
                  if (el.matches && el.matches(selector) || matches(el, selector))
                    children.push(el);
                } else
                  children.push(el);
              }
            });
            return FakejQuery(children);
          },
          parent: function(selector) {
            var parents = [];
            var parent;
            this.each(function() {
              parent = this.parentNode;
              if (selector ? FakejQuery(parent).is(selector) : true)
                parents.push(parent);
            });
            return FakejQuery(parents);
          },
          is: function(selector) {
            var el;
            var i2;
            for (i2 = 0; i2 < this[LEXICON.l]; i2++) {
              el = this[i2];
              if (selector === ":visible")
                return elementIsVisible(el);
              if (selector === ":hidden")
                return !elementIsVisible(el);
              if (el.matches && el.matches(selector) || matches(el, selector))
                return true;
            }
            return false;
          },
          contents: function() {
            var contents = [];
            var childs;
            var i2;
            this.each(function() {
              childs = this.childNodes;
              for (i2 = 0; i2 < childs[LEXICON.l]; i2++)
                contents.push(childs[i2]);
            });
            return FakejQuery(contents);
          },
          each: function(callback) {
            return each2(this, callback);
          },
          animate: function(props, duration, easing, complete) {
            return this.each(function() {
              animate(this, props, duration, easing, complete);
            });
          },
          stop: function(clearQ, jump) {
            return this.each(function() {
              stop(this, clearQ, jump);
            });
          }
        };
        extend(FakejQuery, {
          extend,
          inArray,
          isEmptyObject,
          isPlainObject,
          each: each2
        });
        return FakejQuery;
      }();
      var INSTANCES = function() {
        var _targets = [];
        var _instancePropertyString = "__overlayScrollbars__";
        return function(target, instance) {
          var argLen = arguments[LEXICON.l];
          if (argLen < 1) {
            return _targets;
          } else {
            if (instance) {
              target[_instancePropertyString] = instance;
              _targets.push(target);
            } else {
              var index = COMPATIBILITY.inA(target, _targets);
              if (index > -1) {
                if (argLen > 1) {
                  delete target[_instancePropertyString];
                  _targets.splice(index, 1);
                } else {
                  return _targets[index][_instancePropertyString];
                }
              }
            }
          }
        };
      }();
      var PLUGIN = function() {
        var _plugin;
        var _pluginsGlobals;
        var _pluginsAutoUpdateLoop;
        var _pluginsExtensions = [];
        var _pluginsOptions = function() {
          var type = COMPATIBILITY.type;
          var possibleTemplateTypes = [
            TYPES.b,
            TYPES.n,
            TYPES.s,
            TYPES.a,
            TYPES.o,
            TYPES.f,
            TYPES.z
          ];
          var restrictedStringsSplit = " ";
          var restrictedStringsPossibilitiesSplit = ":";
          var classNameAllowedValues = [TYPES.z, TYPES.s];
          var numberAllowedValues = TYPES.n;
          var booleanNullAllowedValues = [TYPES.z, TYPES.b];
          var booleanTrueTemplate = [true, TYPES.b];
          var booleanFalseTemplate = [false, TYPES.b];
          var callbackTemplate = [null, [TYPES.z, TYPES.f]];
          var updateOnLoadTemplate = [["img"], [TYPES.s, TYPES.a, TYPES.z]];
          var inheritedAttrsTemplate = [["style", "class"], [TYPES.s, TYPES.a, TYPES.z]];
          var resizeAllowedValues = "n:none b:both h:horizontal v:vertical";
          var overflowBehaviorAllowedValues = "v-h:visible-hidden v-s:visible-scroll s:scroll h:hidden";
          var scrollbarsVisibilityAllowedValues = "v:visible h:hidden a:auto";
          var scrollbarsAutoHideAllowedValues = "n:never s:scroll l:leave m:move";
          var optionsDefaultsAndTemplate = {
            className: ["os-theme-dark", classNameAllowedValues],
            resize: ["none", resizeAllowedValues],
            sizeAutoCapable: booleanTrueTemplate,
            clipAlways: booleanTrueTemplate,
            normalizeRTL: booleanTrueTemplate,
            paddingAbsolute: booleanFalseTemplate,
            autoUpdate: [null, booleanNullAllowedValues],
            autoUpdateInterval: [33, numberAllowedValues],
            updateOnLoad: updateOnLoadTemplate,
            nativeScrollbarsOverlaid: {
              showNativeScrollbars: booleanFalseTemplate,
              initialize: booleanTrueTemplate
            },
            overflowBehavior: {
              x: ["scroll", overflowBehaviorAllowedValues],
              y: ["scroll", overflowBehaviorAllowedValues]
            },
            scrollbars: {
              visibility: ["auto", scrollbarsVisibilityAllowedValues],
              autoHide: ["never", scrollbarsAutoHideAllowedValues],
              autoHideDelay: [800, numberAllowedValues],
              dragScrolling: booleanTrueTemplate,
              clickScrolling: booleanFalseTemplate,
              touchSupport: booleanTrueTemplate,
              snapHandle: booleanFalseTemplate
            },
            textarea: {
              dynWidth: booleanFalseTemplate,
              dynHeight: booleanFalseTemplate,
              inheritedAttrs: inheritedAttrsTemplate
            },
            callbacks: {
              onInitialized: callbackTemplate,
              onInitializationWithdrawn: callbackTemplate,
              onDestroyed: callbackTemplate,
              onScrollStart: callbackTemplate,
              onScroll: callbackTemplate,
              onScrollStop: callbackTemplate,
              onOverflowChanged: callbackTemplate,
              onOverflowAmountChanged: callbackTemplate,
              onDirectionChanged: callbackTemplate,
              onContentSizeChanged: callbackTemplate,
              onHostSizeChanged: callbackTemplate,
              onUpdated: callbackTemplate
            }
          };
          var convert = function(template2) {
            var recursive = function(obj) {
              var key2;
              var val;
              var valType;
              for (key2 in obj) {
                if (!obj[LEXICON.hOP](key2))
                  continue;
                val = obj[key2];
                valType = type(val);
                if (valType == TYPES.a)
                  obj[key2] = val[template2 ? 1 : 0];
                else if (valType == TYPES.o)
                  obj[key2] = recursive(val);
              }
              return obj;
            };
            return recursive(FRAMEWORK.extend(true, {}, optionsDefaultsAndTemplate));
          };
          return {
            _defaults: convert(),
            _template: convert(true),
            _validate: function(obj, template2, writeErrors, diffObj) {
              var validatedOptions = {};
              var validatedOptionsPrepared = {};
              var objectCopy = FRAMEWORK.extend(true, {}, obj);
              var inArray = FRAMEWORK.inArray;
              var isEmptyObj = FRAMEWORK.isEmptyObject;
              var checkObjectProps = function(data2, template3, diffData, validatedOptions2, validatedOptionsPrepared2, prevPropName) {
                for (var prop in template3) {
                  if (template3[LEXICON.hOP](prop) && data2[LEXICON.hOP](prop)) {
                    var isValid = false;
                    var isDiff = false;
                    var templateValue = template3[prop];
                    var templateValueType = type(templateValue);
                    var templateIsComplex = templateValueType == TYPES.o;
                    var templateTypes = !COMPATIBILITY.isA(templateValue) ? [templateValue] : templateValue;
                    var dataDiffValue = diffData[prop];
                    var dataValue = data2[prop];
                    var dataValueType = type(dataValue);
                    var propPrefix = prevPropName ? prevPropName + "." : "";
                    var error2 = 'The option "' + propPrefix + prop + `" wasn't set, because`;
                    var errorPossibleTypes = [];
                    var errorRestrictedStrings = [];
                    var restrictedStringValuesSplit;
                    var restrictedStringValuesPossibilitiesSplit;
                    var isRestrictedValue;
                    var mainPossibility;
                    var currType;
                    var i2;
                    var v;
                    var j;
                    dataDiffValue = dataDiffValue === undefined2 ? {} : dataDiffValue;
                    if (templateIsComplex && dataValueType == TYPES.o) {
                      validatedOptions2[prop] = {};
                      validatedOptionsPrepared2[prop] = {};
                      checkObjectProps(dataValue, templateValue, dataDiffValue, validatedOptions2[prop], validatedOptionsPrepared2[prop], propPrefix + prop);
                      FRAMEWORK.each([data2, validatedOptions2, validatedOptionsPrepared2], function(index, value) {
                        if (isEmptyObj(value[prop])) {
                          delete value[prop];
                        }
                      });
                    } else if (!templateIsComplex) {
                      for (i2 = 0; i2 < templateTypes[LEXICON.l]; i2++) {
                        currType = templateTypes[i2];
                        templateValueType = type(currType);
                        isRestrictedValue = templateValueType == TYPES.s && inArray(currType, possibleTemplateTypes) === -1;
                        if (isRestrictedValue) {
                          errorPossibleTypes.push(TYPES.s);
                          restrictedStringValuesSplit = currType.split(restrictedStringsSplit);
                          errorRestrictedStrings = errorRestrictedStrings.concat(restrictedStringValuesSplit);
                          for (v = 0; v < restrictedStringValuesSplit[LEXICON.l]; v++) {
                            restrictedStringValuesPossibilitiesSplit = restrictedStringValuesSplit[v].split(restrictedStringsPossibilitiesSplit);
                            mainPossibility = restrictedStringValuesPossibilitiesSplit[0];
                            for (j = 0; j < restrictedStringValuesPossibilitiesSplit[LEXICON.l]; j++) {
                              if (dataValue === restrictedStringValuesPossibilitiesSplit[j]) {
                                isValid = true;
                                break;
                              }
                            }
                            if (isValid)
                              break;
                          }
                        } else {
                          errorPossibleTypes.push(currType);
                          if (dataValueType === currType) {
                            isValid = true;
                            break;
                          }
                        }
                      }
                      if (isValid) {
                        isDiff = dataValue !== dataDiffValue;
                        if (isDiff)
                          validatedOptions2[prop] = dataValue;
                        if (isRestrictedValue ? inArray(dataDiffValue, restrictedStringValuesPossibilitiesSplit) < 0 : isDiff)
                          validatedOptionsPrepared2[prop] = isRestrictedValue ? mainPossibility : dataValue;
                      } else if (writeErrors) {
                        console.warn(error2 + " it doesn't accept the type [ " + dataValueType.toUpperCase() + ' ] with the value of "' + dataValue + '".\r\nAccepted types are: [ ' + errorPossibleTypes.join(", ").toUpperCase() + " ]." + (errorRestrictedStrings[length] > 0 ? "\r\nValid strings are: [ " + errorRestrictedStrings.join(", ").split(restrictedStringsPossibilitiesSplit).join(", ") + " ]." : ""));
                      }
                      delete data2[prop];
                    }
                  }
                }
              };
              checkObjectProps(objectCopy, template2, diffObj || {}, validatedOptions, validatedOptionsPrepared);
              if (!isEmptyObj(objectCopy) && writeErrors)
                console.warn("The following options are discarded due to invalidity:\r\n" + window2.JSON.stringify(objectCopy, null, 2));
              return {
                _default: validatedOptions,
                _prepared: validatedOptionsPrepared
              };
            }
          };
        }();
        function initOverlayScrollbarsStatics() {
          if (!_pluginsGlobals)
            _pluginsGlobals = new OverlayScrollbarsGlobals(_pluginsOptions._defaults);
          if (!_pluginsAutoUpdateLoop)
            _pluginsAutoUpdateLoop = new OverlayScrollbarsAutoUpdateLoop(_pluginsGlobals);
        }
        function OverlayScrollbarsGlobals(defaultOptions) {
          var _base = this;
          var strOverflow = "overflow";
          var strHidden = "hidden";
          var strScroll = "scroll";
          var bodyElement = FRAMEWORK("body");
          var scrollbarDummyElement = FRAMEWORK('<div id="os-dummy-scrollbar-size"><div></div></div>');
          var scrollbarDummyElement0 = scrollbarDummyElement[0];
          var dummyContainerChild = FRAMEWORK(scrollbarDummyElement.children("div").eq(0));
          bodyElement.append(scrollbarDummyElement);
          scrollbarDummyElement.hide().show();
          var nativeScrollbarSize = calcNativeScrollbarSize(scrollbarDummyElement0);
          var nativeScrollbarIsOverlaid = {
            x: nativeScrollbarSize.x === 0,
            y: nativeScrollbarSize.y === 0
          };
          var msie = function() {
            var ua = window2.navigator.userAgent;
            var strIndexOf = "indexOf";
            var strSubString = "substring";
            var msie2 = ua[strIndexOf]("MSIE ");
            var trident = ua[strIndexOf]("Trident/");
            var edge = ua[strIndexOf]("Edge/");
            var rv = ua[strIndexOf]("rv:");
            var result;
            var parseIntFunc = parseInt;
            if (msie2 > 0)
              result = parseIntFunc(ua[strSubString](msie2 + 5, ua[strIndexOf](".", msie2)), 10);
            else if (trident > 0)
              result = parseIntFunc(ua[strSubString](rv + 3, ua[strIndexOf](".", rv)), 10);
            else if (edge > 0)
              result = parseIntFunc(ua[strSubString](edge + 5, ua[strIndexOf](".", edge)), 10);
            return result;
          }();
          FRAMEWORK.extend(_base, {
            defaultOptions,
            msie,
            autoUpdateLoop: false,
            autoUpdateRecommended: !COMPATIBILITY.mO(),
            nativeScrollbarSize,
            nativeScrollbarIsOverlaid,
            nativeScrollbarStyling: function() {
              var result = false;
              scrollbarDummyElement.addClass("os-viewport-native-scrollbars-invisible");
              try {
                result = scrollbarDummyElement.css("scrollbar-width") === "none" && (msie > 9 || !msie) || window2.getComputedStyle(scrollbarDummyElement0, "::-webkit-scrollbar").getPropertyValue("display") === "none";
              } catch (ex) {
              }
              return result;
            }(),
            overlayScrollbarDummySize: { x: 30, y: 30 },
            cssCalc: VENDORS._cssPropertyValue("width", "calc", "(1px)") || null,
            restrictedMeasuring: function() {
              scrollbarDummyElement.css(strOverflow, strHidden);
              var scrollSize = {
                w: scrollbarDummyElement0[LEXICON.sW],
                h: scrollbarDummyElement0[LEXICON.sH]
              };
              scrollbarDummyElement.css(strOverflow, "visible");
              var scrollSize2 = {
                w: scrollbarDummyElement0[LEXICON.sW],
                h: scrollbarDummyElement0[LEXICON.sH]
              };
              return scrollSize.w - scrollSize2.w !== 0 || scrollSize.h - scrollSize2.h !== 0;
            }(),
            rtlScrollBehavior: function() {
              scrollbarDummyElement.css({ "overflow-y": strHidden, "overflow-x": strScroll, "direction": "rtl" }).scrollLeft(0);
              var dummyContainerOffset = scrollbarDummyElement.offset();
              var dummyContainerChildOffset = dummyContainerChild.offset();
              scrollbarDummyElement.scrollLeft(-999);
              var dummyContainerChildOffsetAfterScroll = dummyContainerChild.offset();
              return {
                i: dummyContainerOffset.left === dummyContainerChildOffset.left,
                n: dummyContainerChildOffset.left !== dummyContainerChildOffsetAfterScroll.left
              };
            }(),
            supportTransform: !!VENDORS._cssProperty("transform"),
            supportTransition: !!VENDORS._cssProperty("transition"),
            supportPassiveEvents: function() {
              var supportsPassive = false;
              try {
                window2.addEventListener("test", null, Object.defineProperty({}, "passive", {
                  get: function() {
                    supportsPassive = true;
                  }
                }));
              } catch (e2) {
              }
              return supportsPassive;
            }(),
            supportResizeObserver: !!COMPATIBILITY.rO(),
            supportMutationObserver: !!COMPATIBILITY.mO()
          });
          scrollbarDummyElement.removeAttr(LEXICON.s).remove();
          (function() {
            if (nativeScrollbarIsOverlaid.x && nativeScrollbarIsOverlaid.y)
              return;
            var abs = MATH.abs;
            var windowWidth = COMPATIBILITY.wW();
            var windowHeight = COMPATIBILITY.wH();
            var windowDpr = getWindowDPR();
            var onResize = function() {
              if (INSTANCES().length > 0) {
                var newW = COMPATIBILITY.wW();
                var newH = COMPATIBILITY.wH();
                var deltaW = newW - windowWidth;
                var deltaH = newH - windowHeight;
                if (deltaW === 0 && deltaH === 0)
                  return;
                var deltaWRatio = MATH.round(newW / (windowWidth / 100));
                var deltaHRatio = MATH.round(newH / (windowHeight / 100));
                var absDeltaW = abs(deltaW);
                var absDeltaH = abs(deltaH);
                var absDeltaWRatio = abs(deltaWRatio);
                var absDeltaHRatio = abs(deltaHRatio);
                var newDPR = getWindowDPR();
                var deltaIsBigger = absDeltaW > 2 && absDeltaH > 2;
                var difference = !differenceIsBiggerThanOne(absDeltaWRatio, absDeltaHRatio);
                var dprChanged = newDPR !== windowDpr && windowDpr > 0;
                var isZoom = deltaIsBigger && difference && dprChanged;
                var oldScrollbarSize = _base.nativeScrollbarSize;
                var newScrollbarSize;
                if (isZoom) {
                  bodyElement.append(scrollbarDummyElement);
                  newScrollbarSize = _base.nativeScrollbarSize = calcNativeScrollbarSize(scrollbarDummyElement[0]);
                  scrollbarDummyElement.remove();
                  if (oldScrollbarSize.x !== newScrollbarSize.x || oldScrollbarSize.y !== newScrollbarSize.y) {
                    FRAMEWORK.each(INSTANCES(), function() {
                      if (INSTANCES(this))
                        INSTANCES(this).update("zoom");
                    });
                  }
                }
                windowWidth = newW;
                windowHeight = newH;
                windowDpr = newDPR;
              }
            };
            function differenceIsBiggerThanOne(valOne, valTwo) {
              var absValOne = abs(valOne);
              var absValTwo = abs(valTwo);
              return !(absValOne === absValTwo || absValOne + 1 === absValTwo || absValOne - 1 === absValTwo);
            }
            function getWindowDPR() {
              var dDPI = window2.screen.deviceXDPI || 0;
              var sDPI = window2.screen.logicalXDPI || 1;
              return window2.devicePixelRatio || dDPI / sDPI;
            }
            FRAMEWORK(window2).on("resize", onResize);
          })();
          function calcNativeScrollbarSize(measureElement) {
            return {
              x: measureElement[LEXICON.oH] - measureElement[LEXICON.cH],
              y: measureElement[LEXICON.oW] - measureElement[LEXICON.cW]
            };
          }
        }
        function OverlayScrollbarsAutoUpdateLoop(globals) {
          var _base = this;
          var _inArray = FRAMEWORK.inArray;
          var _getNow = COMPATIBILITY.now;
          var _strAutoUpdate = "autoUpdate";
          var _strAutoUpdateInterval = _strAutoUpdate + "Interval";
          var _strLength = LEXICON.l;
          var _loopingInstances = [];
          var _loopingInstancesIntervalCache = [];
          var _loopIsActive = false;
          var _loopIntervalDefault = 33;
          var _loopInterval = _loopIntervalDefault;
          var _loopTimeOld = _getNow();
          var _loopID;
          var loop = function() {
            if (_loopingInstances[_strLength] > 0 && _loopIsActive) {
              _loopID = COMPATIBILITY.rAF()(function() {
                loop();
              });
              var timeNew = _getNow();
              var timeDelta = timeNew - _loopTimeOld;
              var lowestInterval;
              var instance;
              var instanceOptions;
              var instanceAutoUpdateAllowed;
              var instanceAutoUpdateInterval;
              var now;
              if (timeDelta > _loopInterval) {
                _loopTimeOld = timeNew - timeDelta % _loopInterval;
                lowestInterval = _loopIntervalDefault;
                for (var i2 = 0; i2 < _loopingInstances[_strLength]; i2++) {
                  instance = _loopingInstances[i2];
                  if (instance !== undefined2) {
                    instanceOptions = instance.options();
                    instanceAutoUpdateAllowed = instanceOptions[_strAutoUpdate];
                    instanceAutoUpdateInterval = MATH.max(1, instanceOptions[_strAutoUpdateInterval]);
                    now = _getNow();
                    if ((instanceAutoUpdateAllowed === true || instanceAutoUpdateAllowed === null) && now - _loopingInstancesIntervalCache[i2] > instanceAutoUpdateInterval) {
                      instance.update("auto");
                      _loopingInstancesIntervalCache[i2] = new Date(now += instanceAutoUpdateInterval);
                    }
                    lowestInterval = MATH.max(1, MATH.min(lowestInterval, instanceAutoUpdateInterval));
                  }
                }
                _loopInterval = lowestInterval;
              }
            } else {
              _loopInterval = _loopIntervalDefault;
            }
          };
          _base.add = function(instance) {
            if (_inArray(instance, _loopingInstances) === -1) {
              _loopingInstances.push(instance);
              _loopingInstancesIntervalCache.push(_getNow());
              if (_loopingInstances[_strLength] > 0 && !_loopIsActive) {
                _loopIsActive = true;
                globals.autoUpdateLoop = _loopIsActive;
                loop();
              }
            }
          };
          _base.remove = function(instance) {
            var index = _inArray(instance, _loopingInstances);
            if (index > -1) {
              _loopingInstancesIntervalCache.splice(index, 1);
              _loopingInstances.splice(index, 1);
              if (_loopingInstances[_strLength] === 0 && _loopIsActive) {
                _loopIsActive = false;
                globals.autoUpdateLoop = _loopIsActive;
                if (_loopID !== undefined2) {
                  COMPATIBILITY.cAF()(_loopID);
                  _loopID = -1;
                }
              }
            }
          };
        }
        function OverlayScrollbarsInstance(pluginTargetElement, options, extensions, globals, autoUpdateLoop) {
          var type = COMPATIBILITY.type;
          var inArray = FRAMEWORK.inArray;
          var each2 = FRAMEWORK.each;
          var _base = new _plugin();
          var _frameworkProto = FRAMEWORK[LEXICON.p];
          if (!isHTMLElement(pluginTargetElement))
            return;
          if (INSTANCES(pluginTargetElement)) {
            var inst = INSTANCES(pluginTargetElement);
            inst.options(options);
            return inst;
          }
          var _nativeScrollbarIsOverlaid;
          var _overlayScrollbarDummySize;
          var _rtlScrollBehavior;
          var _autoUpdateRecommended;
          var _msieVersion;
          var _nativeScrollbarStyling;
          var _cssCalc;
          var _nativeScrollbarSize;
          var _supportTransition;
          var _supportTransform;
          var _supportPassiveEvents;
          var _supportResizeObserver;
          var _supportMutationObserver;
          var _restrictedMeasuring;
          var _initialized;
          var _destroyed;
          var _isTextarea;
          var _isBody;
          var _documentMixed;
          var _domExists;
          var _isBorderBox;
          var _sizeAutoObserverAdded;
          var _paddingX;
          var _paddingY;
          var _borderX;
          var _borderY;
          var _marginX;
          var _marginY;
          var _isRTL;
          var _sleeping;
          var _contentBorderSize = {};
          var _scrollHorizontalInfo = {};
          var _scrollVerticalInfo = {};
          var _viewportSize = {};
          var _nativeScrollbarMinSize = {};
          var _strMinusHidden = "-hidden";
          var _strMarginMinus = "margin-";
          var _strPaddingMinus = "padding-";
          var _strBorderMinus = "border-";
          var _strTop = "top";
          var _strRight = "right";
          var _strBottom = "bottom";
          var _strLeft = "left";
          var _strMinMinus = "min-";
          var _strMaxMinus = "max-";
          var _strWidth = "width";
          var _strHeight = "height";
          var _strFloat = "float";
          var _strEmpty = "";
          var _strAuto = "auto";
          var _strSync = "sync";
          var _strScroll = "scroll";
          var _strHundredPercent = "100%";
          var _strX = "x";
          var _strY = "y";
          var _strDot = ".";
          var _strSpace = " ";
          var _strScrollbar = "scrollbar";
          var _strMinusHorizontal = "-horizontal";
          var _strMinusVertical = "-vertical";
          var _strScrollLeft = _strScroll + "Left";
          var _strScrollTop = _strScroll + "Top";
          var _strMouseTouchDownEvent = "mousedown touchstart";
          var _strMouseTouchUpEvent = "mouseup touchend touchcancel";
          var _strMouseTouchMoveEvent = "mousemove touchmove";
          var _strMouseEnter = "mouseenter";
          var _strMouseLeave = "mouseleave";
          var _strKeyDownEvent = "keydown";
          var _strKeyUpEvent = "keyup";
          var _strSelectStartEvent = "selectstart";
          var _strTransitionEndEvent = "transitionend webkitTransitionEnd oTransitionEnd";
          var _strResizeObserverProperty = "__overlayScrollbarsRO__";
          var _cassNamesPrefix = "os-";
          var _classNameHTMLElement = _cassNamesPrefix + "html";
          var _classNameHostElement = _cassNamesPrefix + "host";
          var _classNameHostElementForeign = _classNameHostElement + "-foreign";
          var _classNameHostTextareaElement = _classNameHostElement + "-textarea";
          var _classNameHostScrollbarHorizontalHidden = _classNameHostElement + "-" + _strScrollbar + _strMinusHorizontal + _strMinusHidden;
          var _classNameHostScrollbarVerticalHidden = _classNameHostElement + "-" + _strScrollbar + _strMinusVertical + _strMinusHidden;
          var _classNameHostTransition = _classNameHostElement + "-transition";
          var _classNameHostRTL = _classNameHostElement + "-rtl";
          var _classNameHostResizeDisabled = _classNameHostElement + "-resize-disabled";
          var _classNameHostScrolling = _classNameHostElement + "-scrolling";
          var _classNameHostOverflow = _classNameHostElement + "-overflow";
          var _classNameHostOverflow = _classNameHostElement + "-overflow";
          var _classNameHostOverflowX = _classNameHostOverflow + "-x";
          var _classNameHostOverflowY = _classNameHostOverflow + "-y";
          var _classNameTextareaElement = _cassNamesPrefix + "textarea";
          var _classNameTextareaCoverElement = _classNameTextareaElement + "-cover";
          var _classNamePaddingElement = _cassNamesPrefix + "padding";
          var _classNameViewportElement = _cassNamesPrefix + "viewport";
          var _classNameViewportNativeScrollbarsInvisible = _classNameViewportElement + "-native-scrollbars-invisible";
          var _classNameViewportNativeScrollbarsOverlaid = _classNameViewportElement + "-native-scrollbars-overlaid";
          var _classNameContentElement = _cassNamesPrefix + "content";
          var _classNameContentArrangeElement = _cassNamesPrefix + "content-arrange";
          var _classNameContentGlueElement = _cassNamesPrefix + "content-glue";
          var _classNameSizeAutoObserverElement = _cassNamesPrefix + "size-auto-observer";
          var _classNameResizeObserverElement = _cassNamesPrefix + "resize-observer";
          var _classNameResizeObserverItemElement = _cassNamesPrefix + "resize-observer-item";
          var _classNameResizeObserverItemFinalElement = _classNameResizeObserverItemElement + "-final";
          var _classNameTextInherit = _cassNamesPrefix + "text-inherit";
          var _classNameScrollbar = _cassNamesPrefix + _strScrollbar;
          var _classNameScrollbarTrack = _classNameScrollbar + "-track";
          var _classNameScrollbarTrackOff = _classNameScrollbarTrack + "-off";
          var _classNameScrollbarHandle = _classNameScrollbar + "-handle";
          var _classNameScrollbarHandleOff = _classNameScrollbarHandle + "-off";
          var _classNameScrollbarUnusable = _classNameScrollbar + "-unusable";
          var _classNameScrollbarAutoHidden = _classNameScrollbar + "-" + _strAuto + _strMinusHidden;
          var _classNameScrollbarCorner = _classNameScrollbar + "-corner";
          var _classNameScrollbarCornerResize = _classNameScrollbarCorner + "-resize";
          var _classNameScrollbarCornerResizeB = _classNameScrollbarCornerResize + "-both";
          var _classNameScrollbarCornerResizeH = _classNameScrollbarCornerResize + _strMinusHorizontal;
          var _classNameScrollbarCornerResizeV = _classNameScrollbarCornerResize + _strMinusVertical;
          var _classNameScrollbarHorizontal = _classNameScrollbar + _strMinusHorizontal;
          var _classNameScrollbarVertical = _classNameScrollbar + _strMinusVertical;
          var _classNameDragging = _cassNamesPrefix + "dragging";
          var _classNameThemeNone = _cassNamesPrefix + "theme-none";
          var _classNamesDynamicDestroy = [
            _classNameViewportNativeScrollbarsInvisible,
            _classNameViewportNativeScrollbarsOverlaid,
            _classNameScrollbarTrackOff,
            _classNameScrollbarHandleOff,
            _classNameScrollbarUnusable,
            _classNameScrollbarAutoHidden,
            _classNameScrollbarCornerResize,
            _classNameScrollbarCornerResizeB,
            _classNameScrollbarCornerResizeH,
            _classNameScrollbarCornerResizeV,
            _classNameDragging
          ].join(_strSpace);
          var _callbacksInitQeueue = [];
          var _viewportAttrsFromTarget = [LEXICON.ti];
          var _defaultOptions;
          var _currentOptions;
          var _currentPreparedOptions;
          var _extensions = {};
          var _extensionsPrivateMethods = "added removed on contract";
          var _lastUpdateTime;
          var _swallowedUpdateHints = {};
          var _swallowedUpdateTimeout;
          var _swallowUpdateLag = 42;
          var _updateOnLoadEventName = "load";
          var _updateOnLoadElms = [];
          var _windowElement;
          var _documentElement;
          var _htmlElement;
          var _bodyElement;
          var _targetElement;
          var _hostElement;
          var _sizeAutoObserverElement;
          var _sizeObserverElement;
          var _paddingElement;
          var _viewportElement;
          var _contentElement;
          var _contentArrangeElement;
          var _contentGlueElement;
          var _textareaCoverElement;
          var _scrollbarCornerElement;
          var _scrollbarHorizontalElement;
          var _scrollbarHorizontalTrackElement;
          var _scrollbarHorizontalHandleElement;
          var _scrollbarVerticalElement;
          var _scrollbarVerticalTrackElement;
          var _scrollbarVerticalHandleElement;
          var _windowElementNative;
          var _documentElementNative;
          var _targetElementNative;
          var _hostElementNative;
          var _sizeAutoObserverElementNative;
          var _sizeObserverElementNative;
          var _paddingElementNative;
          var _viewportElementNative;
          var _contentElementNative;
          var _hostSizeCache;
          var _contentScrollSizeCache;
          var _arrangeContentSizeCache;
          var _hasOverflowCache;
          var _hideOverflowCache;
          var _widthAutoCache;
          var _heightAutoCache;
          var _cssBoxSizingCache;
          var _cssPaddingCache;
          var _cssBorderCache;
          var _cssMarginCache;
          var _cssDirectionCache;
          var _cssDirectionDetectedCache;
          var _paddingAbsoluteCache;
          var _clipAlwaysCache;
          var _contentGlueSizeCache;
          var _overflowBehaviorCache;
          var _overflowAmountCache;
          var _ignoreOverlayScrollbarHidingCache;
          var _autoUpdateCache;
          var _sizeAutoCapableCache;
          var _contentElementScrollSizeChangeDetectedCache;
          var _hostElementSizeChangeDetectedCache;
          var _scrollbarsVisibilityCache;
          var _scrollbarsAutoHideCache;
          var _scrollbarsClickScrollingCache;
          var _scrollbarsDragScrollingCache;
          var _resizeCache;
          var _normalizeRTLCache;
          var _classNameCache;
          var _oldClassName;
          var _textareaAutoWrappingCache;
          var _textareaInfoCache;
          var _textareaSizeCache;
          var _textareaDynHeightCache;
          var _textareaDynWidthCache;
          var _bodyMinSizeCache;
          var _updateAutoCache = {};
          var _mutationObserverHost;
          var _mutationObserverContent;
          var _mutationObserverHostCallback;
          var _mutationObserverContentCallback;
          var _mutationObserversConnected;
          var _mutationObserverAttrsTextarea = ["wrap", "cols", "rows"];
          var _mutationObserverAttrsHost = [LEXICON.i, LEXICON.c, LEXICON.s, "open"].concat(_viewportAttrsFromTarget);
          var _destroyEvents = [];
          var _textareaHasFocus;
          var _scrollbarsAutoHideTimeoutId;
          var _scrollbarsAutoHideMoveTimeoutId;
          var _scrollbarsAutoHideDelay;
          var _scrollbarsAutoHideNever;
          var _scrollbarsAutoHideScroll;
          var _scrollbarsAutoHideMove;
          var _scrollbarsAutoHideLeave;
          var _scrollbarsHandleHovered;
          var _scrollbarsHandlesDefineScrollPos;
          var _resizeNone;
          var _resizeBoth;
          var _resizeHorizontal;
          var _resizeVertical;
          function setupResponsiveEventListener(element, eventNames, listener, remove2, passiveOrOptions) {
            var collected = COMPATIBILITY.isA(eventNames) && COMPATIBILITY.isA(listener);
            var method = remove2 ? "removeEventListener" : "addEventListener";
            var onOff = remove2 ? "off" : "on";
            var events = collected ? false : eventNames.split(_strSpace);
            var i2 = 0;
            var passiveOrOptionsIsObj = FRAMEWORK.isPlainObject(passiveOrOptions);
            var passive = _supportPassiveEvents && (passiveOrOptionsIsObj ? passiveOrOptions._passive : passiveOrOptions) || false;
            var capture = passiveOrOptionsIsObj && (passiveOrOptions._capture || false);
            var nativeParam = _supportPassiveEvents ? {
              passive,
              capture
            } : capture;
            if (collected) {
              for (; i2 < eventNames[LEXICON.l]; i2++)
                setupResponsiveEventListener(element, eventNames[i2], listener[i2], remove2, passiveOrOptions);
            } else {
              for (; i2 < events[LEXICON.l]; i2++) {
                if (_supportPassiveEvents) {
                  element[0][method](events[i2], listener, nativeParam);
                } else {
                  element[onOff](events[i2], listener);
                }
              }
            }
          }
          function addDestroyEventListener(element, eventNames, listener, passive) {
            setupResponsiveEventListener(element, eventNames, listener, false, passive);
            _destroyEvents.push(COMPATIBILITY.bind(setupResponsiveEventListener, 0, element, eventNames, listener, true, passive));
          }
          function setupResizeObserver(targetElement, onElementResizedCallback) {
            if (targetElement) {
              var resizeObserver = COMPATIBILITY.rO();
              var strAnimationStartEvent = "animationstart mozAnimationStart webkitAnimationStart MSAnimationStart";
              var strChildNodes = "childNodes";
              var constScroll = 3333333;
              var callback = function() {
                targetElement[_strScrollTop](constScroll)[_strScrollLeft](_isRTL ? _rtlScrollBehavior.n ? -constScroll : _rtlScrollBehavior.i ? 0 : constScroll : constScroll);
                onElementResizedCallback();
              };
              if (onElementResizedCallback) {
                if (_supportResizeObserver) {
                  var element = targetElement.addClass("observed").append(generateDiv(_classNameResizeObserverElement)).contents()[0];
                  var observer = element[_strResizeObserverProperty] = new resizeObserver(callback);
                  observer.observe(element);
                } else {
                  if (_msieVersion > 9 || !_autoUpdateRecommended) {
                    targetElement.prepend(generateDiv(_classNameResizeObserverElement, generateDiv({ c: _classNameResizeObserverItemElement, dir: "ltr" }, generateDiv(_classNameResizeObserverItemElement, generateDiv(_classNameResizeObserverItemFinalElement)) + generateDiv(_classNameResizeObserverItemElement, generateDiv({ c: _classNameResizeObserverItemFinalElement, style: "width: 200%; height: 200%" })))));
                    var observerElement = targetElement[0][strChildNodes][0][strChildNodes][0];
                    var shrinkElement = FRAMEWORK(observerElement[strChildNodes][1]);
                    var expandElement = FRAMEWORK(observerElement[strChildNodes][0]);
                    var expandElementChild = FRAMEWORK(expandElement[0][strChildNodes][0]);
                    var widthCache = observerElement[LEXICON.oW];
                    var heightCache = observerElement[LEXICON.oH];
                    var isDirty;
                    var rAFId;
                    var currWidth;
                    var currHeight;
                    var factor = 2;
                    var nativeScrollbarSize = globals.nativeScrollbarSize;
                    var reset = function() {
                      expandElement[_strScrollLeft](constScroll)[_strScrollTop](constScroll);
                      shrinkElement[_strScrollLeft](constScroll)[_strScrollTop](constScroll);
                    };
                    var onResized = function() {
                      rAFId = 0;
                      if (!isDirty)
                        return;
                      widthCache = currWidth;
                      heightCache = currHeight;
                      callback();
                    };
                    var onScroll = function(event) {
                      currWidth = observerElement[LEXICON.oW];
                      currHeight = observerElement[LEXICON.oH];
                      isDirty = currWidth != widthCache || currHeight != heightCache;
                      if (event && isDirty && !rAFId) {
                        COMPATIBILITY.cAF()(rAFId);
                        rAFId = COMPATIBILITY.rAF()(onResized);
                      } else if (!event)
                        onResized();
                      reset();
                      if (event) {
                        COMPATIBILITY.prvD(event);
                        COMPATIBILITY.stpP(event);
                      }
                      return false;
                    };
                    var expandChildCSS = {};
                    var observerElementCSS = {};
                    setTopRightBottomLeft(observerElementCSS, _strEmpty, [
                      -((nativeScrollbarSize.y + 1) * factor),
                      nativeScrollbarSize.x * -factor,
                      nativeScrollbarSize.y * -factor,
                      -((nativeScrollbarSize.x + 1) * factor)
                    ]);
                    FRAMEWORK(observerElement).css(observerElementCSS);
                    expandElement.on(_strScroll, onScroll);
                    shrinkElement.on(_strScroll, onScroll);
                    targetElement.on(strAnimationStartEvent, function() {
                      onScroll(false);
                    });
                    expandChildCSS[_strWidth] = constScroll;
                    expandChildCSS[_strHeight] = constScroll;
                    expandElementChild.css(expandChildCSS);
                    reset();
                  } else {
                    var attachEvent = _documentElementNative.attachEvent;
                    var isIE = _msieVersion !== undefined2;
                    if (attachEvent) {
                      targetElement.prepend(generateDiv(_classNameResizeObserverElement));
                      findFirst(targetElement, _strDot + _classNameResizeObserverElement)[0].attachEvent("onresize", callback);
                    } else {
                      var obj = _documentElementNative.createElement(TYPES.o);
                      obj.setAttribute(LEXICON.ti, "-1");
                      obj.setAttribute(LEXICON.c, _classNameResizeObserverElement);
                      obj.onload = function() {
                        var wnd = this.contentDocument.defaultView;
                        wnd.addEventListener("resize", callback);
                        wnd.document.documentElement.style.display = "none";
                      };
                      obj.type = "text/html";
                      if (isIE)
                        targetElement.prepend(obj);
                      obj.data = "about:blank";
                      if (!isIE)
                        targetElement.prepend(obj);
                      targetElement.on(strAnimationStartEvent, callback);
                    }
                  }
                }
                if (targetElement[0] === _sizeObserverElementNative) {
                  var directionChanged = function() {
                    var dir = _hostElement.css("direction");
                    var css6 = {};
                    var scrollLeftValue = 0;
                    var result = false;
                    if (dir !== _cssDirectionDetectedCache) {
                      if (dir === "ltr") {
                        css6[_strLeft] = 0;
                        css6[_strRight] = _strAuto;
                        scrollLeftValue = constScroll;
                      } else {
                        css6[_strLeft] = _strAuto;
                        css6[_strRight] = 0;
                        scrollLeftValue = _rtlScrollBehavior.n ? -constScroll : _rtlScrollBehavior.i ? 0 : constScroll;
                      }
                      _sizeObserverElement.children().eq(0).css(css6);
                      _sizeObserverElement[_strScrollLeft](scrollLeftValue)[_strScrollTop](constScroll);
                      _cssDirectionDetectedCache = dir;
                      result = true;
                    }
                    return result;
                  };
                  directionChanged();
                  addDestroyEventListener(targetElement, _strScroll, function(event) {
                    if (directionChanged())
                      update();
                    COMPATIBILITY.prvD(event);
                    COMPATIBILITY.stpP(event);
                    return false;
                  });
                }
              } else {
                if (_supportResizeObserver) {
                  var element = targetElement.contents()[0];
                  var resizeObserverObj = element[_strResizeObserverProperty];
                  if (resizeObserverObj) {
                    resizeObserverObj.disconnect();
                    delete element[_strResizeObserverProperty];
                  }
                } else {
                  remove(targetElement.children(_strDot + _classNameResizeObserverElement).eq(0));
                }
              }
            }
          }
          function createMutationObservers() {
            if (_supportMutationObserver) {
              var mutationObserverContentLag = 11;
              var mutationObserver = COMPATIBILITY.mO();
              var contentLastUpdate = COMPATIBILITY.now();
              var mutationTarget;
              var mutationAttrName;
              var mutationIsClass;
              var oldMutationVal;
              var newClassVal;
              var hostClassNameRegex;
              var contentTimeout;
              var now;
              var sizeAuto;
              var action;
              _mutationObserverHostCallback = function(mutations) {
                var doUpdate = false;
                var doUpdateForce = false;
                var mutation;
                var mutatedAttrs = [];
                if (_initialized && !_sleeping) {
                  each2(mutations, function() {
                    mutation = this;
                    mutationTarget = mutation.target;
                    mutationAttrName = mutation.attributeName;
                    mutationIsClass = mutationAttrName === LEXICON.c;
                    oldMutationVal = mutation.oldValue;
                    newClassVal = mutationTarget.className;
                    if (_domExists && mutationIsClass && !doUpdateForce) {
                      if (oldMutationVal.indexOf(_classNameHostElementForeign) > -1 && newClassVal.indexOf(_classNameHostElementForeign) < 0) {
                        hostClassNameRegex = createHostClassNameRegExp(true);
                        _hostElementNative.className = newClassVal.split(_strSpace).concat(oldMutationVal.split(_strSpace).filter(function(name) {
                          return name.match(hostClassNameRegex);
                        })).join(_strSpace);
                        doUpdate = doUpdateForce = true;
                      }
                    }
                    if (!doUpdate) {
                      doUpdate = mutationIsClass ? hostClassNamesChanged(oldMutationVal, newClassVal) : mutationAttrName === LEXICON.s ? oldMutationVal !== mutationTarget[LEXICON.s].cssText : true;
                    }
                    mutatedAttrs.push(mutationAttrName);
                  });
                  updateViewportAttrsFromTarget(mutatedAttrs);
                  if (doUpdate)
                    _base.update(doUpdateForce || _strAuto);
                }
                return doUpdate;
              };
              _mutationObserverContentCallback = function(mutations) {
                var doUpdate = false;
                var mutation;
                if (_initialized && !_sleeping) {
                  each2(mutations, function() {
                    mutation = this;
                    doUpdate = isUnknownMutation(mutation);
                    return !doUpdate;
                  });
                  if (doUpdate) {
                    now = COMPATIBILITY.now();
                    sizeAuto = _heightAutoCache || _widthAutoCache;
                    action = function() {
                      if (!_destroyed) {
                        contentLastUpdate = now;
                        if (_isTextarea)
                          textareaUpdate();
                        if (sizeAuto)
                          update();
                        else
                          _base.update(_strAuto);
                      }
                    };
                    clearTimeout(contentTimeout);
                    if (mutationObserverContentLag <= 0 || now - contentLastUpdate > mutationObserverContentLag || !sizeAuto)
                      action();
                    else
                      contentTimeout = setTimeout(action, mutationObserverContentLag);
                  }
                }
                return doUpdate;
              };
              _mutationObserverHost = new mutationObserver(_mutationObserverHostCallback);
              _mutationObserverContent = new mutationObserver(_mutationObserverContentCallback);
            }
          }
          function connectMutationObservers() {
            if (_supportMutationObserver && !_mutationObserversConnected) {
              _mutationObserverHost.observe(_hostElementNative, {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: _mutationObserverAttrsHost
              });
              _mutationObserverContent.observe(_isTextarea ? _targetElementNative : _contentElementNative, {
                attributes: true,
                attributeOldValue: true,
                subtree: !_isTextarea,
                childList: !_isTextarea,
                characterData: !_isTextarea,
                attributeFilter: _isTextarea ? _mutationObserverAttrsTextarea : _mutationObserverAttrsHost
              });
              _mutationObserversConnected = true;
            }
          }
          function disconnectMutationObservers() {
            if (_supportMutationObserver && _mutationObserversConnected) {
              _mutationObserverHost.disconnect();
              _mutationObserverContent.disconnect();
              _mutationObserversConnected = false;
            }
          }
          function hostOnResized() {
            if (!_sleeping) {
              var changed;
              var hostSize = {
                w: _sizeObserverElementNative[LEXICON.sW],
                h: _sizeObserverElementNative[LEXICON.sH]
              };
              changed = checkCache(hostSize, _hostElementSizeChangeDetectedCache);
              _hostElementSizeChangeDetectedCache = hostSize;
              if (changed)
                update({ _hostSizeChanged: true });
            }
          }
          function hostOnMouseEnter() {
            if (_scrollbarsAutoHideLeave)
              refreshScrollbarsAutoHide(true);
          }
          function hostOnMouseLeave() {
            if (_scrollbarsAutoHideLeave && !_bodyElement.hasClass(_classNameDragging))
              refreshScrollbarsAutoHide(false);
          }
          function hostOnMouseMove() {
            if (_scrollbarsAutoHideMove) {
              refreshScrollbarsAutoHide(true);
              clearTimeout(_scrollbarsAutoHideMoveTimeoutId);
              _scrollbarsAutoHideMoveTimeoutId = setTimeout(function() {
                if (_scrollbarsAutoHideMove && !_destroyed)
                  refreshScrollbarsAutoHide(false);
              }, 100);
            }
          }
          function documentOnSelectStart(event) {
            COMPATIBILITY.prvD(event);
            return false;
          }
          function updateOnLoadCallback(event) {
            var elm = FRAMEWORK(event.target);
            eachUpdateOnLoad(function(i2, updateOnLoadSelector) {
              if (elm.is(updateOnLoadSelector)) {
                update({ _contentSizeChanged: true });
              }
            });
          }
          function setupHostMouseTouchEvents(destroy) {
            if (!destroy)
              setupHostMouseTouchEvents(true);
            setupResponsiveEventListener(_hostElement, _strMouseTouchMoveEvent.split(_strSpace)[0], hostOnMouseMove, !_scrollbarsAutoHideMove || destroy, true);
            setupResponsiveEventListener(_hostElement, [_strMouseEnter, _strMouseLeave], [hostOnMouseEnter, hostOnMouseLeave], !_scrollbarsAutoHideLeave || destroy, true);
            if (!_initialized && !destroy)
              _hostElement.one("mouseover", hostOnMouseEnter);
          }
          function bodyMinSizeChanged() {
            var bodyMinSize = {};
            if (_isBody && _contentArrangeElement) {
              bodyMinSize.w = parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus + _strWidth));
              bodyMinSize.h = parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus + _strHeight));
              bodyMinSize.c = checkCache(bodyMinSize, _bodyMinSizeCache);
              bodyMinSize.f = true;
            }
            _bodyMinSizeCache = bodyMinSize;
            return !!bodyMinSize.c;
          }
          function hostClassNamesChanged(oldClassNames, newClassNames) {
            var currClasses = typeof newClassNames == TYPES.s ? newClassNames.split(_strSpace) : [];
            var oldClasses = typeof oldClassNames == TYPES.s ? oldClassNames.split(_strSpace) : [];
            var diff = getArrayDifferences(oldClasses, currClasses);
            var idx = inArray(_classNameThemeNone, diff);
            var i2;
            var regex;
            if (idx > -1)
              diff.splice(idx, 1);
            if (diff[LEXICON.l] > 0) {
              regex = createHostClassNameRegExp(true, true);
              for (i2 = 0; i2 < diff.length; i2++) {
                if (!diff[i2].match(regex)) {
                  return true;
                }
              }
            }
            return false;
          }
          function isUnknownMutation(mutation) {
            var attributeName = mutation.attributeName;
            var mutationTarget = mutation.target;
            var mutationType = mutation.type;
            var strClosest = "closest";
            if (mutationTarget === _contentElementNative)
              return attributeName === null;
            if (mutationType === "attributes" && (attributeName === LEXICON.c || attributeName === LEXICON.s) && !_isTextarea) {
              if (attributeName === LEXICON.c && FRAMEWORK(mutationTarget).hasClass(_classNameHostElement))
                return hostClassNamesChanged(mutation.oldValue, mutationTarget.className);
              if (typeof mutationTarget[strClosest] != TYPES.f)
                return true;
              if (mutationTarget[strClosest](_strDot + _classNameResizeObserverElement) !== null || mutationTarget[strClosest](_strDot + _classNameScrollbar) !== null || mutationTarget[strClosest](_strDot + _classNameScrollbarCorner) !== null)
                return false;
            }
            return true;
          }
          function updateAutoContentSizeChanged() {
            if (_sleeping)
              return false;
            var contentMeasureElement = getContentMeasureElement();
            var textareaValueLength = _isTextarea && _widthAutoCache && !_textareaAutoWrappingCache ? _targetElement.val().length : 0;
            var setCSS = !_mutationObserversConnected && _widthAutoCache && !_isTextarea;
            var css6 = {};
            var float;
            var bodyMinSizeC;
            var changed;
            var contentElementScrollSize;
            if (setCSS) {
              float = _contentElement.css(_strFloat);
              css6[_strFloat] = _isRTL ? _strRight : _strLeft;
              css6[_strWidth] = _strAuto;
              _contentElement.css(css6);
            }
            contentElementScrollSize = {
              w: contentMeasureElement[LEXICON.sW] + textareaValueLength,
              h: contentMeasureElement[LEXICON.sH] + textareaValueLength
            };
            if (setCSS) {
              css6[_strFloat] = float;
              css6[_strWidth] = _strHundredPercent;
              _contentElement.css(css6);
            }
            bodyMinSizeC = bodyMinSizeChanged();
            changed = checkCache(contentElementScrollSize, _contentElementScrollSizeChangeDetectedCache);
            _contentElementScrollSizeChangeDetectedCache = contentElementScrollSize;
            return changed || bodyMinSizeC;
          }
          function meaningfulAttrsChanged() {
            if (_sleeping || _mutationObserversConnected)
              return;
            var elem;
            var curr;
            var cache;
            var changedAttrs = [];
            var checks = [
              {
                _elem: _hostElement,
                _attrs: _mutationObserverAttrsHost.concat(":visible")
              },
              {
                _elem: _isTextarea ? _targetElement : undefined2,
                _attrs: _mutationObserverAttrsTextarea
              }
            ];
            each2(checks, function(index, check) {
              elem = check._elem;
              if (elem) {
                each2(check._attrs, function(index2, attr) {
                  curr = attr.charAt(0) === ":" ? elem.is(attr) : elem.attr(attr);
                  cache = _updateAutoCache[attr];
                  if (checkCache(curr, cache)) {
                    changedAttrs.push(attr);
                  }
                  _updateAutoCache[attr] = curr;
                });
              }
            });
            updateViewportAttrsFromTarget(changedAttrs);
            return changedAttrs[LEXICON.l] > 0;
          }
          function isSizeAffectingCSSProperty(propertyName) {
            if (!_initialized)
              return true;
            var flexGrow = "flex-grow";
            var flexShrink = "flex-shrink";
            var flexBasis = "flex-basis";
            var affectingPropsX = [
              _strWidth,
              _strMinMinus + _strWidth,
              _strMaxMinus + _strWidth,
              _strMarginMinus + _strLeft,
              _strMarginMinus + _strRight,
              _strLeft,
              _strRight,
              "font-weight",
              "word-spacing",
              flexGrow,
              flexShrink,
              flexBasis
            ];
            var affectingPropsXContentBox = [
              _strPaddingMinus + _strLeft,
              _strPaddingMinus + _strRight,
              _strBorderMinus + _strLeft + _strWidth,
              _strBorderMinus + _strRight + _strWidth
            ];
            var affectingPropsY = [
              _strHeight,
              _strMinMinus + _strHeight,
              _strMaxMinus + _strHeight,
              _strMarginMinus + _strTop,
              _strMarginMinus + _strBottom,
              _strTop,
              _strBottom,
              "line-height",
              flexGrow,
              flexShrink,
              flexBasis
            ];
            var affectingPropsYContentBox = [
              _strPaddingMinus + _strTop,
              _strPaddingMinus + _strBottom,
              _strBorderMinus + _strTop + _strWidth,
              _strBorderMinus + _strBottom + _strWidth
            ];
            var _strS = "s";
            var _strVS = "v-s";
            var checkX = _overflowBehaviorCache.x === _strS || _overflowBehaviorCache.x === _strVS;
            var checkY = _overflowBehaviorCache.y === _strS || _overflowBehaviorCache.y === _strVS;
            var sizeIsAffected = false;
            var checkPropertyName = function(arr, name) {
              for (var i2 = 0; i2 < arr[LEXICON.l]; i2++) {
                if (arr[i2] === name)
                  return true;
              }
              return false;
            };
            if (checkY) {
              sizeIsAffected = checkPropertyName(affectingPropsY, propertyName);
              if (!sizeIsAffected && !_isBorderBox)
                sizeIsAffected = checkPropertyName(affectingPropsYContentBox, propertyName);
            }
            if (checkX && !sizeIsAffected) {
              sizeIsAffected = checkPropertyName(affectingPropsX, propertyName);
              if (!sizeIsAffected && !_isBorderBox)
                sizeIsAffected = checkPropertyName(affectingPropsXContentBox, propertyName);
            }
            return sizeIsAffected;
          }
          function updateViewportAttrsFromTarget(attrs) {
            attrs = attrs || _viewportAttrsFromTarget;
            each2(attrs, function(index, attr) {
              if (COMPATIBILITY.inA(attr, _viewportAttrsFromTarget) > -1) {
                var targetAttr = _targetElement.attr(attr);
                if (type(targetAttr) == TYPES.s) {
                  _viewportElement.attr(attr, targetAttr);
                } else {
                  _viewportElement.removeAttr(attr);
                }
              }
            });
          }
          function textareaUpdate() {
            if (!_sleeping) {
              var wrapAttrOff = !_textareaAutoWrappingCache;
              var minWidth = _viewportSize.w;
              var minHeight = _viewportSize.h;
              var css6 = {};
              var doMeasure = _widthAutoCache || wrapAttrOff;
              var origWidth;
              var width;
              var origHeight;
              var height;
              css6[_strMinMinus + _strWidth] = _strEmpty;
              css6[_strMinMinus + _strHeight] = _strEmpty;
              css6[_strWidth] = _strAuto;
              _targetElement.css(css6);
              origWidth = _targetElementNative[LEXICON.oW];
              width = doMeasure ? MATH.max(origWidth, _targetElementNative[LEXICON.sW] - 1) : 1;
              css6[_strWidth] = _widthAutoCache ? _strAuto : _strHundredPercent;
              css6[_strMinMinus + _strWidth] = _strHundredPercent;
              css6[_strHeight] = _strAuto;
              _targetElement.css(css6);
              origHeight = _targetElementNative[LEXICON.oH];
              height = MATH.max(origHeight, _targetElementNative[LEXICON.sH] - 1);
              css6[_strWidth] = width;
              css6[_strHeight] = height;
              _textareaCoverElement.css(css6);
              css6[_strMinMinus + _strWidth] = minWidth;
              css6[_strMinMinus + _strHeight] = minHeight;
              _targetElement.css(css6);
              return {
                _originalWidth: origWidth,
                _originalHeight: origHeight,
                _dynamicWidth: width,
                _dynamicHeight: height
              };
            }
          }
          function update(updateHints) {
            clearTimeout(_swallowedUpdateTimeout);
            updateHints = updateHints || {};
            _swallowedUpdateHints._hostSizeChanged |= updateHints._hostSizeChanged;
            _swallowedUpdateHints._contentSizeChanged |= updateHints._contentSizeChanged;
            _swallowedUpdateHints._force |= updateHints._force;
            var now = COMPATIBILITY.now();
            var hostSizeChanged = !!_swallowedUpdateHints._hostSizeChanged;
            var contentSizeChanged = !!_swallowedUpdateHints._contentSizeChanged;
            var force = !!_swallowedUpdateHints._force;
            var changedOptions = updateHints._changedOptions;
            var swallow = _swallowUpdateLag > 0 && _initialized && !_destroyed && !force && !changedOptions && now - _lastUpdateTime < _swallowUpdateLag && (!_heightAutoCache && !_widthAutoCache);
            var displayIsHidden;
            if (swallow)
              _swallowedUpdateTimeout = setTimeout(update, _swallowUpdateLag);
            if (_destroyed || swallow || _sleeping && !changedOptions || _initialized && !force && (displayIsHidden = _hostElement.is(":hidden")) || _hostElement.css("display") === "inline")
              return;
            _lastUpdateTime = now;
            _swallowedUpdateHints = {};
            if (_nativeScrollbarStyling && !(_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)) {
              _nativeScrollbarSize.x = 0;
              _nativeScrollbarSize.y = 0;
            } else {
              _nativeScrollbarSize = extendDeep({}, globals.nativeScrollbarSize);
            }
            _nativeScrollbarMinSize = {
              x: (_nativeScrollbarSize.x + (_nativeScrollbarIsOverlaid.x ? 0 : 3)) * 3,
              y: (_nativeScrollbarSize.y + (_nativeScrollbarIsOverlaid.y ? 0 : 3)) * 3
            };
            changedOptions = changedOptions || {};
            var checkCacheAutoForce = function() {
              return checkCache.apply(this, [].slice.call(arguments).concat([force]));
            };
            var currScroll = {
              x: _viewportElement[_strScrollLeft](),
              y: _viewportElement[_strScrollTop]()
            };
            var currentPreparedOptionsScrollbars = _currentPreparedOptions.scrollbars;
            var currentPreparedOptionsTextarea = _currentPreparedOptions.textarea;
            var scrollbarsVisibility = currentPreparedOptionsScrollbars.visibility;
            var scrollbarsVisibilityChanged = checkCacheAutoForce(scrollbarsVisibility, _scrollbarsVisibilityCache);
            var scrollbarsAutoHide = currentPreparedOptionsScrollbars.autoHide;
            var scrollbarsAutoHideChanged = checkCacheAutoForce(scrollbarsAutoHide, _scrollbarsAutoHideCache);
            var scrollbarsClickScrolling = currentPreparedOptionsScrollbars.clickScrolling;
            var scrollbarsClickScrollingChanged = checkCacheAutoForce(scrollbarsClickScrolling, _scrollbarsClickScrollingCache);
            var scrollbarsDragScrolling = currentPreparedOptionsScrollbars.dragScrolling;
            var scrollbarsDragScrollingChanged = checkCacheAutoForce(scrollbarsDragScrolling, _scrollbarsDragScrollingCache);
            var className = _currentPreparedOptions.className;
            var classNameChanged = checkCacheAutoForce(className, _classNameCache);
            var resize = _currentPreparedOptions.resize;
            var resizeChanged = checkCacheAutoForce(resize, _resizeCache) && !_isBody;
            var paddingAbsolute = _currentPreparedOptions.paddingAbsolute;
            var paddingAbsoluteChanged = checkCacheAutoForce(paddingAbsolute, _paddingAbsoluteCache);
            var clipAlways = _currentPreparedOptions.clipAlways;
            var clipAlwaysChanged = checkCacheAutoForce(clipAlways, _clipAlwaysCache);
            var sizeAutoCapable = _currentPreparedOptions.sizeAutoCapable && !_isBody;
            var sizeAutoCapableChanged = checkCacheAutoForce(sizeAutoCapable, _sizeAutoCapableCache);
            var ignoreOverlayScrollbarHiding = _currentPreparedOptions.nativeScrollbarsOverlaid.showNativeScrollbars;
            var ignoreOverlayScrollbarHidingChanged = checkCacheAutoForce(ignoreOverlayScrollbarHiding, _ignoreOverlayScrollbarHidingCache);
            var autoUpdate = _currentPreparedOptions.autoUpdate;
            var autoUpdateChanged = checkCacheAutoForce(autoUpdate, _autoUpdateCache);
            var overflowBehavior = _currentPreparedOptions.overflowBehavior;
            var overflowBehaviorChanged = checkCacheAutoForce(overflowBehavior, _overflowBehaviorCache, force);
            var textareaDynWidth = currentPreparedOptionsTextarea.dynWidth;
            var textareaDynWidthChanged = checkCacheAutoForce(_textareaDynWidthCache, textareaDynWidth);
            var textareaDynHeight = currentPreparedOptionsTextarea.dynHeight;
            var textareaDynHeightChanged = checkCacheAutoForce(_textareaDynHeightCache, textareaDynHeight);
            _scrollbarsAutoHideNever = scrollbarsAutoHide === "n";
            _scrollbarsAutoHideScroll = scrollbarsAutoHide === "s";
            _scrollbarsAutoHideMove = scrollbarsAutoHide === "m";
            _scrollbarsAutoHideLeave = scrollbarsAutoHide === "l";
            _scrollbarsAutoHideDelay = currentPreparedOptionsScrollbars.autoHideDelay;
            _oldClassName = _classNameCache;
            _resizeNone = resize === "n";
            _resizeBoth = resize === "b";
            _resizeHorizontal = resize === "h";
            _resizeVertical = resize === "v";
            _normalizeRTLCache = _currentPreparedOptions.normalizeRTL;
            ignoreOverlayScrollbarHiding = ignoreOverlayScrollbarHiding && (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y);
            _scrollbarsVisibilityCache = scrollbarsVisibility;
            _scrollbarsAutoHideCache = scrollbarsAutoHide;
            _scrollbarsClickScrollingCache = scrollbarsClickScrolling;
            _scrollbarsDragScrollingCache = scrollbarsDragScrolling;
            _classNameCache = className;
            _resizeCache = resize;
            _paddingAbsoluteCache = paddingAbsolute;
            _clipAlwaysCache = clipAlways;
            _sizeAutoCapableCache = sizeAutoCapable;
            _ignoreOverlayScrollbarHidingCache = ignoreOverlayScrollbarHiding;
            _autoUpdateCache = autoUpdate;
            _overflowBehaviorCache = extendDeep({}, overflowBehavior);
            _textareaDynWidthCache = textareaDynWidth;
            _textareaDynHeightCache = textareaDynHeight;
            _hasOverflowCache = _hasOverflowCache || { x: false, y: false };
            if (classNameChanged) {
              removeClass(_hostElement, _oldClassName + _strSpace + _classNameThemeNone);
              addClass(_hostElement, className !== undefined2 && className !== null && className.length > 0 ? className : _classNameThemeNone);
            }
            if (autoUpdateChanged) {
              if (autoUpdate === true || autoUpdate === null && _autoUpdateRecommended) {
                disconnectMutationObservers();
                autoUpdateLoop.add(_base);
              } else {
                autoUpdateLoop.remove(_base);
                connectMutationObservers();
              }
            }
            if (sizeAutoCapableChanged) {
              if (sizeAutoCapable) {
                if (_contentGlueElement) {
                  _contentGlueElement.show();
                } else {
                  _contentGlueElement = FRAMEWORK(generateDiv(_classNameContentGlueElement));
                  _paddingElement.before(_contentGlueElement);
                }
                if (_sizeAutoObserverAdded) {
                  _sizeAutoObserverElement.show();
                } else {
                  _sizeAutoObserverElement = FRAMEWORK(generateDiv(_classNameSizeAutoObserverElement));
                  _sizeAutoObserverElementNative = _sizeAutoObserverElement[0];
                  _contentGlueElement.before(_sizeAutoObserverElement);
                  var oldSize = { w: -1, h: -1 };
                  setupResizeObserver(_sizeAutoObserverElement, function() {
                    var newSize = {
                      w: _sizeAutoObserverElementNative[LEXICON.oW],
                      h: _sizeAutoObserverElementNative[LEXICON.oH]
                    };
                    if (checkCache(newSize, oldSize)) {
                      if (_initialized && (_heightAutoCache && newSize.h > 0) || _widthAutoCache && newSize.w > 0) {
                        update();
                      } else if (_initialized && (!_heightAutoCache && newSize.h === 0) || !_widthAutoCache && newSize.w === 0) {
                        update();
                      }
                    }
                    oldSize = newSize;
                  });
                  _sizeAutoObserverAdded = true;
                  if (_cssCalc !== null)
                    _sizeAutoObserverElement.css(_strHeight, _cssCalc + "(100% + 1px)");
                }
              } else {
                if (_sizeAutoObserverAdded)
                  _sizeAutoObserverElement.hide();
                if (_contentGlueElement)
                  _contentGlueElement.hide();
              }
            }
            if (force) {
              _sizeObserverElement.find("*").trigger(_strScroll);
              if (_sizeAutoObserverAdded)
                _sizeAutoObserverElement.find("*").trigger(_strScroll);
            }
            displayIsHidden = displayIsHidden === undefined2 ? _hostElement.is(":hidden") : displayIsHidden;
            var textareaAutoWrapping = _isTextarea ? _targetElement.attr("wrap") !== "off" : false;
            var textareaAutoWrappingChanged = checkCacheAutoForce(textareaAutoWrapping, _textareaAutoWrappingCache);
            var cssDirection = _hostElement.css("direction");
            var cssDirectionChanged = checkCacheAutoForce(cssDirection, _cssDirectionCache);
            var boxSizing = _hostElement.css("box-sizing");
            var boxSizingChanged = checkCacheAutoForce(boxSizing, _cssBoxSizingCache);
            var padding = getTopRightBottomLeftHost(_strPaddingMinus);
            var sizeAutoObserverElementBCRect;
            try {
              sizeAutoObserverElementBCRect = _sizeAutoObserverAdded ? _sizeAutoObserverElementNative[LEXICON.bCR]() : null;
            } catch (ex) {
              return;
            }
            _isRTL = cssDirection === "rtl";
            _isBorderBox = boxSizing === "border-box";
            var isRTLLeft = _isRTL ? _strLeft : _strRight;
            var isRTLRight = _isRTL ? _strRight : _strLeft;
            var widthAutoResizeDetection = false;
            var widthAutoObserverDetection = _sizeAutoObserverAdded && _hostElement.css(_strFloat) !== "none" ? MATH.round(sizeAutoObserverElementBCRect.right - sizeAutoObserverElementBCRect.left) === 0 && (!paddingAbsolute ? _hostElementNative[LEXICON.cW] - _paddingX > 0 : true) : false;
            if (sizeAutoCapable && !widthAutoObserverDetection) {
              var tmpCurrHostWidth = _hostElementNative[LEXICON.oW];
              var tmpCurrContentGlueWidth = _contentGlueElement.css(_strWidth);
              _contentGlueElement.css(_strWidth, _strAuto);
              var tmpNewHostWidth = _hostElementNative[LEXICON.oW];
              _contentGlueElement.css(_strWidth, tmpCurrContentGlueWidth);
              widthAutoResizeDetection = tmpCurrHostWidth !== tmpNewHostWidth;
              if (!widthAutoResizeDetection) {
                _contentGlueElement.css(_strWidth, tmpCurrHostWidth + 1);
                tmpNewHostWidth = _hostElementNative[LEXICON.oW];
                _contentGlueElement.css(_strWidth, tmpCurrContentGlueWidth);
                widthAutoResizeDetection = tmpCurrHostWidth !== tmpNewHostWidth;
              }
            }
            var widthAuto = (widthAutoObserverDetection || widthAutoResizeDetection) && sizeAutoCapable && !displayIsHidden;
            var widthAutoChanged = checkCacheAutoForce(widthAuto, _widthAutoCache);
            var wasWidthAuto = !widthAuto && _widthAutoCache;
            var heightAuto = _sizeAutoObserverAdded && sizeAutoCapable && !displayIsHidden ? MATH.round(sizeAutoObserverElementBCRect.bottom - sizeAutoObserverElementBCRect.top) === 0 : false;
            var heightAutoChanged = checkCacheAutoForce(heightAuto, _heightAutoCache);
            var wasHeightAuto = !heightAuto && _heightAutoCache;
            var updateBorderX = widthAuto && _isBorderBox || !_isBorderBox;
            var updateBorderY = heightAuto && _isBorderBox || !_isBorderBox;
            var border = getTopRightBottomLeftHost(_strBorderMinus, "-" + _strWidth, !updateBorderX, !updateBorderY);
            var margin = getTopRightBottomLeftHost(_strMarginMinus);
            var contentElementCSS = {};
            var contentGlueElementCSS = {};
            var getHostSize = function() {
              return {
                w: _hostElementNative[LEXICON.cW],
                h: _hostElementNative[LEXICON.cH]
              };
            };
            var getViewportSize = function() {
              return {
                w: _paddingElementNative[LEXICON.oW] + MATH.max(0, _contentElementNative[LEXICON.cW] - _contentElementNative[LEXICON.sW]),
                h: _paddingElementNative[LEXICON.oH] + MATH.max(0, _contentElementNative[LEXICON.cH] - _contentElementNative[LEXICON.sH])
              };
            };
            var paddingAbsoluteX = _paddingX = padding.l + padding.r;
            var paddingAbsoluteY = _paddingY = padding.t + padding.b;
            paddingAbsoluteX *= paddingAbsolute ? 1 : 0;
            paddingAbsoluteY *= paddingAbsolute ? 1 : 0;
            padding.c = checkCacheAutoForce(padding, _cssPaddingCache);
            _borderX = border.l + border.r;
            _borderY = border.t + border.b;
            border.c = checkCacheAutoForce(border, _cssBorderCache);
            _marginX = margin.l + margin.r;
            _marginY = margin.t + margin.b;
            margin.c = checkCacheAutoForce(margin, _cssMarginCache);
            _textareaAutoWrappingCache = textareaAutoWrapping;
            _cssDirectionCache = cssDirection;
            _cssBoxSizingCache = boxSizing;
            _widthAutoCache = widthAuto;
            _heightAutoCache = heightAuto;
            _cssPaddingCache = padding;
            _cssBorderCache = border;
            _cssMarginCache = margin;
            if (cssDirectionChanged && _sizeAutoObserverAdded)
              _sizeAutoObserverElement.css(_strFloat, isRTLRight);
            if (padding.c || cssDirectionChanged || paddingAbsoluteChanged || widthAutoChanged || heightAutoChanged || boxSizingChanged || sizeAutoCapableChanged) {
              var paddingElementCSS = {};
              var textareaCSS = {};
              var paddingValues = [padding.t, padding.r, padding.b, padding.l];
              setTopRightBottomLeft(contentGlueElementCSS, _strMarginMinus, [-padding.t, -padding.r, -padding.b, -padding.l]);
              if (paddingAbsolute) {
                setTopRightBottomLeft(paddingElementCSS, _strEmpty, paddingValues);
                setTopRightBottomLeft(_isTextarea ? textareaCSS : contentElementCSS, _strPaddingMinus);
              } else {
                setTopRightBottomLeft(paddingElementCSS, _strEmpty);
                setTopRightBottomLeft(_isTextarea ? textareaCSS : contentElementCSS, _strPaddingMinus, paddingValues);
              }
              _paddingElement.css(paddingElementCSS);
              _targetElement.css(textareaCSS);
            }
            _viewportSize = getViewportSize();
            var textareaSize = _isTextarea ? textareaUpdate() : false;
            var textareaSizeChanged = _isTextarea && checkCacheAutoForce(textareaSize, _textareaSizeCache);
            var textareaDynOrigSize = _isTextarea && textareaSize ? {
              w: textareaDynWidth ? textareaSize._dynamicWidth : textareaSize._originalWidth,
              h: textareaDynHeight ? textareaSize._dynamicHeight : textareaSize._originalHeight
            } : {};
            _textareaSizeCache = textareaSize;
            if (heightAuto && (heightAutoChanged || paddingAbsoluteChanged || boxSizingChanged || padding.c || border.c)) {
              contentElementCSS[_strHeight] = _strAuto;
            } else if (heightAutoChanged || paddingAbsoluteChanged) {
              contentElementCSS[_strHeight] = _strHundredPercent;
            }
            if (widthAuto && (widthAutoChanged || paddingAbsoluteChanged || boxSizingChanged || padding.c || border.c || cssDirectionChanged)) {
              contentElementCSS[_strWidth] = _strAuto;
              contentGlueElementCSS[_strMaxMinus + _strWidth] = _strHundredPercent;
            } else if (widthAutoChanged || paddingAbsoluteChanged) {
              contentElementCSS[_strWidth] = _strHundredPercent;
              contentElementCSS[_strFloat] = _strEmpty;
              contentGlueElementCSS[_strMaxMinus + _strWidth] = _strEmpty;
            }
            if (widthAuto) {
              contentGlueElementCSS[_strWidth] = _strAuto;
              contentElementCSS[_strWidth] = VENDORS._cssPropertyValue(_strWidth, "max-content intrinsic") || _strAuto;
              contentElementCSS[_strFloat] = isRTLRight;
            } else {
              contentGlueElementCSS[_strWidth] = _strEmpty;
            }
            if (heightAuto) {
              contentGlueElementCSS[_strHeight] = textareaDynOrigSize.h || _contentElementNative[LEXICON.cH];
            } else {
              contentGlueElementCSS[_strHeight] = _strEmpty;
            }
            if (sizeAutoCapable)
              _contentGlueElement.css(contentGlueElementCSS);
            _contentElement.css(contentElementCSS);
            contentElementCSS = {};
            contentGlueElementCSS = {};
            if (hostSizeChanged || contentSizeChanged || textareaSizeChanged || cssDirectionChanged || boxSizingChanged || paddingAbsoluteChanged || widthAutoChanged || widthAuto || heightAutoChanged || heightAuto || ignoreOverlayScrollbarHidingChanged || overflowBehaviorChanged || clipAlwaysChanged || resizeChanged || scrollbarsVisibilityChanged || scrollbarsAutoHideChanged || scrollbarsDragScrollingChanged || scrollbarsClickScrollingChanged || textareaDynWidthChanged || textareaDynHeightChanged || textareaAutoWrappingChanged) {
              var strOverflow = "overflow";
              var strOverflowX = strOverflow + "-x";
              var strOverflowY = strOverflow + "-y";
              var strHidden = "hidden";
              var strVisible = "visible";
              if (!_nativeScrollbarStyling) {
                var viewportElementResetCSS = {};
                var resetXTmp = _hasOverflowCache.y && _hideOverflowCache.ys && !ignoreOverlayScrollbarHiding ? _nativeScrollbarIsOverlaid.y ? _viewportElement.css(isRTLLeft) : -_nativeScrollbarSize.y : 0;
                var resetBottomTmp = _hasOverflowCache.x && _hideOverflowCache.xs && !ignoreOverlayScrollbarHiding ? _nativeScrollbarIsOverlaid.x ? _viewportElement.css(_strBottom) : -_nativeScrollbarSize.x : 0;
                setTopRightBottomLeft(viewportElementResetCSS, _strEmpty);
                _viewportElement.css(viewportElementResetCSS);
              }
              var contentMeasureElement = getContentMeasureElement();
              var contentSize = {
                w: textareaDynOrigSize.w || contentMeasureElement[LEXICON.cW],
                h: textareaDynOrigSize.h || contentMeasureElement[LEXICON.cH]
              };
              var scrollSize = {
                w: contentMeasureElement[LEXICON.sW],
                h: contentMeasureElement[LEXICON.sH]
              };
              if (!_nativeScrollbarStyling) {
                viewportElementResetCSS[_strBottom] = wasHeightAuto ? _strEmpty : resetBottomTmp;
                viewportElementResetCSS[isRTLLeft] = wasWidthAuto ? _strEmpty : resetXTmp;
                _viewportElement.css(viewportElementResetCSS);
              }
              _viewportSize = getViewportSize();
              var hostSize = getHostSize();
              var hostAbsoluteRectSize = {
                w: hostSize.w - _marginX - _borderX - (_isBorderBox ? 0 : _paddingX),
                h: hostSize.h - _marginY - _borderY - (_isBorderBox ? 0 : _paddingY)
              };
              var contentGlueSize = {
                w: MATH.max((widthAuto ? contentSize.w : scrollSize.w) + paddingAbsoluteX, hostAbsoluteRectSize.w),
                h: MATH.max((heightAuto ? contentSize.h : scrollSize.h) + paddingAbsoluteY, hostAbsoluteRectSize.h)
              };
              contentGlueSize.c = checkCacheAutoForce(contentGlueSize, _contentGlueSizeCache);
              _contentGlueSizeCache = contentGlueSize;
              if (sizeAutoCapable) {
                if (contentGlueSize.c || (heightAuto || widthAuto)) {
                  contentGlueElementCSS[_strWidth] = contentGlueSize.w;
                  contentGlueElementCSS[_strHeight] = contentGlueSize.h;
                  if (!_isTextarea) {
                    contentSize = {
                      w: contentMeasureElement[LEXICON.cW],
                      h: contentMeasureElement[LEXICON.cH]
                    };
                  }
                }
                var textareaCoverCSS = {};
                var setContentGlueElementCSSfunction = function(horizontal) {
                  var scrollbarVars = getScrollbarVars(horizontal);
                  var wh = scrollbarVars._w_h;
                  var strWH = scrollbarVars._width_height;
                  var autoSize = horizontal ? widthAuto : heightAuto;
                  var borderSize = horizontal ? _borderX : _borderY;
                  var paddingSize = horizontal ? _paddingX : _paddingY;
                  var marginSize = horizontal ? _marginX : _marginY;
                  var viewportSize = _viewportSize[wh] - borderSize - marginSize - (_isBorderBox ? 0 : paddingSize);
                  if (!autoSize || !autoSize && border.c)
                    contentGlueElementCSS[strWH] = hostAbsoluteRectSize[wh] - 1;
                  if (autoSize && contentSize[wh] < viewportSize && (horizontal && _isTextarea ? !textareaAutoWrapping : true)) {
                    if (_isTextarea)
                      textareaCoverCSS[strWH] = parseToZeroOrNumber(_textareaCoverElement.css(strWH)) - 1;
                    contentGlueElementCSS[strWH] -= 1;
                  }
                  if (contentSize[wh] > 0)
                    contentGlueElementCSS[strWH] = MATH.max(1, contentGlueElementCSS[strWH]);
                };
                setContentGlueElementCSSfunction(true);
                setContentGlueElementCSSfunction(false);
                if (_isTextarea)
                  _textareaCoverElement.css(textareaCoverCSS);
                _contentGlueElement.css(contentGlueElementCSS);
              }
              if (widthAuto)
                contentElementCSS[_strWidth] = _strHundredPercent;
              if (widthAuto && !_isBorderBox && !_mutationObserversConnected)
                contentElementCSS[_strFloat] = "none";
              _contentElement.css(contentElementCSS);
              contentElementCSS = {};
              var contentScrollSize = {
                w: contentMeasureElement[LEXICON.sW],
                h: contentMeasureElement[LEXICON.sH]
              };
              contentScrollSize.c = contentSizeChanged = checkCacheAutoForce(contentScrollSize, _contentScrollSizeCache);
              _contentScrollSizeCache = contentScrollSize;
              _viewportSize = getViewportSize();
              hostSize = getHostSize();
              hostSizeChanged = checkCacheAutoForce(hostSize, _hostSizeCache);
              _hostSizeCache = hostSize;
              var hideOverflowForceTextarea = _isTextarea && (_viewportSize.w === 0 || _viewportSize.h === 0);
              var previousOverflowAmount = _overflowAmountCache;
              var overflowBehaviorIsVS = {};
              var overflowBehaviorIsVH = {};
              var overflowBehaviorIsS = {};
              var overflowAmount = {};
              var hasOverflow = {};
              var hideOverflow = {};
              var canScroll = {};
              var viewportRect = _paddingElementNative[LEXICON.bCR]();
              var setOverflowVariables = function(horizontal) {
                var scrollbarVars = getScrollbarVars(horizontal);
                var scrollbarVarsInverted = getScrollbarVars(!horizontal);
                var xyI = scrollbarVarsInverted._x_y;
                var xy = scrollbarVars._x_y;
                var wh = scrollbarVars._w_h;
                var widthHeight = scrollbarVars._width_height;
                var scrollMax = _strScroll + scrollbarVars._Left_Top + "Max";
                var fractionalOverflowAmount = viewportRect[widthHeight] ? MATH.abs(viewportRect[widthHeight] - _viewportSize[wh]) : 0;
                var checkFractionalOverflowAmount = previousOverflowAmount && previousOverflowAmount[xy] > 0 && _viewportElementNative[scrollMax] === 0;
                overflowBehaviorIsVS[xy] = overflowBehavior[xy] === "v-s";
                overflowBehaviorIsVH[xy] = overflowBehavior[xy] === "v-h";
                overflowBehaviorIsS[xy] = overflowBehavior[xy] === "s";
                overflowAmount[xy] = MATH.max(0, MATH.round((contentScrollSize[wh] - _viewportSize[wh]) * 100) / 100);
                overflowAmount[xy] *= hideOverflowForceTextarea || checkFractionalOverflowAmount && fractionalOverflowAmount > 0 && fractionalOverflowAmount < 1 ? 0 : 1;
                hasOverflow[xy] = overflowAmount[xy] > 0;
                hideOverflow[xy] = overflowBehaviorIsVS[xy] || overflowBehaviorIsVH[xy] ? hasOverflow[xyI] && !overflowBehaviorIsVS[xyI] && !overflowBehaviorIsVH[xyI] : hasOverflow[xy];
                hideOverflow[xy + "s"] = hideOverflow[xy] ? overflowBehaviorIsS[xy] || overflowBehaviorIsVS[xy] : false;
                canScroll[xy] = hasOverflow[xy] && hideOverflow[xy + "s"];
              };
              setOverflowVariables(true);
              setOverflowVariables(false);
              overflowAmount.c = checkCacheAutoForce(overflowAmount, _overflowAmountCache);
              _overflowAmountCache = overflowAmount;
              hasOverflow.c = checkCacheAutoForce(hasOverflow, _hasOverflowCache);
              _hasOverflowCache = hasOverflow;
              hideOverflow.c = checkCacheAutoForce(hideOverflow, _hideOverflowCache);
              _hideOverflowCache = hideOverflow;
              if (_nativeScrollbarIsOverlaid.x || _nativeScrollbarIsOverlaid.y) {
                var borderDesign = "px solid transparent";
                var contentArrangeElementCSS = {};
                var arrangeContent = {};
                var arrangeChanged = force;
                var setContentElementCSS;
                if (hasOverflow.x || hasOverflow.y) {
                  arrangeContent.w = _nativeScrollbarIsOverlaid.y && hasOverflow.y ? contentScrollSize.w + _overlayScrollbarDummySize.y : _strEmpty;
                  arrangeContent.h = _nativeScrollbarIsOverlaid.x && hasOverflow.x ? contentScrollSize.h + _overlayScrollbarDummySize.x : _strEmpty;
                  arrangeChanged = checkCacheAutoForce(arrangeContent, _arrangeContentSizeCache);
                  _arrangeContentSizeCache = arrangeContent;
                }
                if (hasOverflow.c || hideOverflow.c || contentScrollSize.c || cssDirectionChanged || widthAutoChanged || heightAutoChanged || widthAuto || heightAuto || ignoreOverlayScrollbarHidingChanged) {
                  contentElementCSS[_strMarginMinus + isRTLRight] = contentElementCSS[_strBorderMinus + isRTLRight] = _strEmpty;
                  setContentElementCSS = function(horizontal) {
                    var scrollbarVars = getScrollbarVars(horizontal);
                    var scrollbarVarsInverted = getScrollbarVars(!horizontal);
                    var xy = scrollbarVars._x_y;
                    var strDirection = horizontal ? _strBottom : isRTLLeft;
                    var invertedAutoSize = horizontal ? heightAuto : widthAuto;
                    if (_nativeScrollbarIsOverlaid[xy] && hasOverflow[xy] && hideOverflow[xy + "s"]) {
                      contentElementCSS[_strMarginMinus + strDirection] = invertedAutoSize ? ignoreOverlayScrollbarHiding ? _strEmpty : _overlayScrollbarDummySize[xy] : _strEmpty;
                      contentElementCSS[_strBorderMinus + strDirection] = (horizontal ? !invertedAutoSize : true) && !ignoreOverlayScrollbarHiding ? _overlayScrollbarDummySize[xy] + borderDesign : _strEmpty;
                    } else {
                      arrangeContent[scrollbarVarsInverted._w_h] = contentElementCSS[_strMarginMinus + strDirection] = contentElementCSS[_strBorderMinus + strDirection] = _strEmpty;
                      arrangeChanged = true;
                    }
                  };
                  if (_nativeScrollbarStyling) {
                    addRemoveClass(_viewportElement, _classNameViewportNativeScrollbarsInvisible, !ignoreOverlayScrollbarHiding);
                  } else {
                    setContentElementCSS(true);
                    setContentElementCSS(false);
                  }
                }
                if (ignoreOverlayScrollbarHiding) {
                  arrangeContent.w = arrangeContent.h = _strEmpty;
                  arrangeChanged = true;
                }
                if (arrangeChanged && !_nativeScrollbarStyling) {
                  contentArrangeElementCSS[_strWidth] = hideOverflow.y ? arrangeContent.w : _strEmpty;
                  contentArrangeElementCSS[_strHeight] = hideOverflow.x ? arrangeContent.h : _strEmpty;
                  if (!_contentArrangeElement) {
                    _contentArrangeElement = FRAMEWORK(generateDiv(_classNameContentArrangeElement));
                    _viewportElement.prepend(_contentArrangeElement);
                  }
                  _contentArrangeElement.css(contentArrangeElementCSS);
                }
                _contentElement.css(contentElementCSS);
              }
              var viewportElementCSS = {};
              var paddingElementCSS = {};
              var setViewportCSS;
              if (hostSizeChanged || hasOverflow.c || hideOverflow.c || contentScrollSize.c || overflowBehaviorChanged || boxSizingChanged || ignoreOverlayScrollbarHidingChanged || cssDirectionChanged || clipAlwaysChanged || heightAutoChanged) {
                viewportElementCSS[isRTLRight] = _strEmpty;
                setViewportCSS = function(horizontal) {
                  var scrollbarVars = getScrollbarVars(horizontal);
                  var scrollbarVarsInverted = getScrollbarVars(!horizontal);
                  var xy = scrollbarVars._x_y;
                  var XY = scrollbarVars._X_Y;
                  var strDirection = horizontal ? _strBottom : isRTLLeft;
                  var reset = function() {
                    viewportElementCSS[strDirection] = _strEmpty;
                    _contentBorderSize[scrollbarVarsInverted._w_h] = 0;
                  };
                  if (hasOverflow[xy] && hideOverflow[xy + "s"]) {
                    viewportElementCSS[strOverflow + XY] = _strScroll;
                    if (ignoreOverlayScrollbarHiding || _nativeScrollbarStyling) {
                      reset();
                    } else {
                      viewportElementCSS[strDirection] = -(_nativeScrollbarIsOverlaid[xy] ? _overlayScrollbarDummySize[xy] : _nativeScrollbarSize[xy]);
                      _contentBorderSize[scrollbarVarsInverted._w_h] = _nativeScrollbarIsOverlaid[xy] ? _overlayScrollbarDummySize[scrollbarVarsInverted._x_y] : 0;
                    }
                  } else {
                    viewportElementCSS[strOverflow + XY] = _strEmpty;
                    reset();
                  }
                };
                setViewportCSS(true);
                setViewportCSS(false);
                if (!_nativeScrollbarStyling && (_viewportSize.h < _nativeScrollbarMinSize.x || _viewportSize.w < _nativeScrollbarMinSize.y) && (hasOverflow.x && hideOverflow.x && !_nativeScrollbarIsOverlaid.x || hasOverflow.y && hideOverflow.y && !_nativeScrollbarIsOverlaid.y)) {
                  viewportElementCSS[_strPaddingMinus + _strTop] = _nativeScrollbarMinSize.x;
                  viewportElementCSS[_strMarginMinus + _strTop] = -_nativeScrollbarMinSize.x;
                  viewportElementCSS[_strPaddingMinus + isRTLRight] = _nativeScrollbarMinSize.y;
                  viewportElementCSS[_strMarginMinus + isRTLRight] = -_nativeScrollbarMinSize.y;
                } else {
                  viewportElementCSS[_strPaddingMinus + _strTop] = viewportElementCSS[_strMarginMinus + _strTop] = viewportElementCSS[_strPaddingMinus + isRTLRight] = viewportElementCSS[_strMarginMinus + isRTLRight] = _strEmpty;
                }
                viewportElementCSS[_strPaddingMinus + isRTLLeft] = viewportElementCSS[_strMarginMinus + isRTLLeft] = _strEmpty;
                if (hasOverflow.x && hideOverflow.x || hasOverflow.y && hideOverflow.y || hideOverflowForceTextarea) {
                  if (_isTextarea && hideOverflowForceTextarea) {
                    paddingElementCSS[strOverflowX] = paddingElementCSS[strOverflowY] = strHidden;
                  }
                } else {
                  if (!clipAlways || (overflowBehaviorIsVH.x || overflowBehaviorIsVS.x || overflowBehaviorIsVH.y || overflowBehaviorIsVS.y)) {
                    if (_isTextarea) {
                      paddingElementCSS[strOverflowX] = paddingElementCSS[strOverflowY] = _strEmpty;
                    }
                    viewportElementCSS[strOverflowX] = viewportElementCSS[strOverflowY] = strVisible;
                  }
                }
                _paddingElement.css(paddingElementCSS);
                _viewportElement.css(viewportElementCSS);
                viewportElementCSS = {};
                if ((hasOverflow.c || boxSizingChanged || widthAutoChanged || heightAutoChanged) && !(_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)) {
                  var elementStyle = _contentElementNative[LEXICON.s];
                  var dump;
                  elementStyle.webkitTransform = "scale(1)";
                  elementStyle.display = "run-in";
                  dump = _contentElementNative[LEXICON.oH];
                  elementStyle.display = _strEmpty;
                  elementStyle.webkitTransform = _strEmpty;
                }
              }
              contentElementCSS = {};
              if (cssDirectionChanged || widthAutoChanged || heightAutoChanged) {
                if (_isRTL && widthAuto) {
                  var floatTmp = _contentElement.css(_strFloat);
                  var posLeftWithoutFloat = MATH.round(_contentElement.css(_strFloat, _strEmpty).css(_strLeft, _strEmpty).position().left);
                  _contentElement.css(_strFloat, floatTmp);
                  var posLeftWithFloat = MATH.round(_contentElement.position().left);
                  if (posLeftWithoutFloat !== posLeftWithFloat)
                    contentElementCSS[_strLeft] = posLeftWithoutFloat;
                } else {
                  contentElementCSS[_strLeft] = _strEmpty;
                }
              }
              _contentElement.css(contentElementCSS);
              if (_isTextarea && contentSizeChanged) {
                var textareaInfo = getTextareaInfo();
                if (textareaInfo) {
                  var textareaRowsChanged = _textareaInfoCache === undefined2 ? true : textareaInfo._rows !== _textareaInfoCache._rows;
                  var cursorRow = textareaInfo._cursorRow;
                  var cursorCol = textareaInfo._cursorColumn;
                  var widestRow = textareaInfo._widestRow;
                  var lastRow = textareaInfo._rows;
                  var lastCol = textareaInfo._columns;
                  var cursorPos = textareaInfo._cursorPosition;
                  var cursorMax = textareaInfo._cursorMax;
                  var cursorIsLastPosition = cursorPos >= cursorMax && _textareaHasFocus;
                  var textareaScrollAmount = {
                    x: !textareaAutoWrapping && (cursorCol === lastCol && cursorRow === widestRow) ? _overflowAmountCache.x : -1,
                    y: (textareaAutoWrapping ? cursorIsLastPosition || textareaRowsChanged && (previousOverflowAmount ? currScroll.y === previousOverflowAmount.y : false) : (cursorIsLastPosition || textareaRowsChanged) && cursorRow === lastRow) ? _overflowAmountCache.y : -1
                  };
                  currScroll.x = textareaScrollAmount.x > -1 ? _isRTL && _normalizeRTLCache && _rtlScrollBehavior.i ? 0 : textareaScrollAmount.x : currScroll.x;
                  currScroll.y = textareaScrollAmount.y > -1 ? textareaScrollAmount.y : currScroll.y;
                }
                _textareaInfoCache = textareaInfo;
              }
              if (_isRTL && _rtlScrollBehavior.i && _nativeScrollbarIsOverlaid.y && hasOverflow.x && _normalizeRTLCache)
                currScroll.x += _contentBorderSize.w || 0;
              if (widthAuto)
                _hostElement[_strScrollLeft](0);
              if (heightAuto)
                _hostElement[_strScrollTop](0);
              _viewportElement[_strScrollLeft](currScroll.x)[_strScrollTop](currScroll.y);
              var scrollbarsVisibilityVisible = scrollbarsVisibility === "v";
              var scrollbarsVisibilityHidden = scrollbarsVisibility === "h";
              var scrollbarsVisibilityAuto = scrollbarsVisibility === "a";
              var refreshScrollbarsVisibility = function(showX, showY) {
                showY = showY === undefined2 ? showX : showY;
                refreshScrollbarAppearance(true, showX, canScroll.x);
                refreshScrollbarAppearance(false, showY, canScroll.y);
              };
              addRemoveClass(_hostElement, _classNameHostOverflow, hideOverflow.x || hideOverflow.y);
              addRemoveClass(_hostElement, _classNameHostOverflowX, hideOverflow.x);
              addRemoveClass(_hostElement, _classNameHostOverflowY, hideOverflow.y);
              if (cssDirectionChanged && !_isBody) {
                addRemoveClass(_hostElement, _classNameHostRTL, _isRTL);
              }
              if (_isBody)
                addClass(_hostElement, _classNameHostResizeDisabled);
              if (resizeChanged) {
                addRemoveClass(_hostElement, _classNameHostResizeDisabled, _resizeNone);
                addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResize, !_resizeNone);
                addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeB, _resizeBoth);
                addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeH, _resizeHorizontal);
                addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeV, _resizeVertical);
              }
              if (scrollbarsVisibilityChanged || overflowBehaviorChanged || hideOverflow.c || hasOverflow.c || ignoreOverlayScrollbarHidingChanged) {
                if (ignoreOverlayScrollbarHiding) {
                  if (ignoreOverlayScrollbarHidingChanged) {
                    removeClass(_hostElement, _classNameHostScrolling);
                    if (ignoreOverlayScrollbarHiding) {
                      refreshScrollbarsVisibility(false);
                    }
                  }
                } else if (scrollbarsVisibilityAuto) {
                  refreshScrollbarsVisibility(canScroll.x, canScroll.y);
                } else if (scrollbarsVisibilityVisible) {
                  refreshScrollbarsVisibility(true);
                } else if (scrollbarsVisibilityHidden) {
                  refreshScrollbarsVisibility(false);
                }
              }
              if (scrollbarsAutoHideChanged || ignoreOverlayScrollbarHidingChanged) {
                setupHostMouseTouchEvents(!_scrollbarsAutoHideLeave && !_scrollbarsAutoHideMove);
                refreshScrollbarsAutoHide(_scrollbarsAutoHideNever, !_scrollbarsAutoHideNever);
              }
              if (hostSizeChanged || overflowAmount.c || heightAutoChanged || widthAutoChanged || resizeChanged || boxSizingChanged || paddingAbsoluteChanged || ignoreOverlayScrollbarHidingChanged || cssDirectionChanged) {
                refreshScrollbarHandleLength(true);
                refreshScrollbarHandleOffset(true);
                refreshScrollbarHandleLength(false);
                refreshScrollbarHandleOffset(false);
              }
              if (scrollbarsClickScrollingChanged)
                refreshScrollbarsInteractive(true, scrollbarsClickScrolling);
              if (scrollbarsDragScrollingChanged)
                refreshScrollbarsInteractive(false, scrollbarsDragScrolling);
              dispatchCallback("onDirectionChanged", {
                isRTL: _isRTL,
                dir: cssDirection
              }, cssDirectionChanged);
              dispatchCallback("onHostSizeChanged", {
                width: _hostSizeCache.w,
                height: _hostSizeCache.h
              }, hostSizeChanged);
              dispatchCallback("onContentSizeChanged", {
                width: _contentScrollSizeCache.w,
                height: _contentScrollSizeCache.h
              }, contentSizeChanged);
              dispatchCallback("onOverflowChanged", {
                x: hasOverflow.x,
                y: hasOverflow.y,
                xScrollable: hideOverflow.xs,
                yScrollable: hideOverflow.ys,
                clipped: hideOverflow.x || hideOverflow.y
              }, hasOverflow.c || hideOverflow.c);
              dispatchCallback("onOverflowAmountChanged", {
                x: overflowAmount.x,
                y: overflowAmount.y
              }, overflowAmount.c);
            }
            if (_isBody && _bodyMinSizeCache && (_hasOverflowCache.c || _bodyMinSizeCache.c)) {
              if (!_bodyMinSizeCache.f)
                bodyMinSizeChanged();
              if (_nativeScrollbarIsOverlaid.y && _hasOverflowCache.x)
                _contentElement.css(_strMinMinus + _strWidth, _bodyMinSizeCache.w + _overlayScrollbarDummySize.y);
              if (_nativeScrollbarIsOverlaid.x && _hasOverflowCache.y)
                _contentElement.css(_strMinMinus + _strHeight, _bodyMinSizeCache.h + _overlayScrollbarDummySize.x);
              _bodyMinSizeCache.c = false;
            }
            if (_initialized && changedOptions.updateOnLoad) {
              updateElementsOnLoad();
            }
            dispatchCallback("onUpdated", { forced: force });
          }
          function updateElementsOnLoad() {
            if (!_isTextarea) {
              eachUpdateOnLoad(function(i2, updateOnLoadSelector) {
                _contentElement.find(updateOnLoadSelector).each(function(i3, el) {
                  if (COMPATIBILITY.inA(el, _updateOnLoadElms) < 0) {
                    _updateOnLoadElms.push(el);
                    FRAMEWORK(el).off(_updateOnLoadEventName, updateOnLoadCallback).on(_updateOnLoadEventName, updateOnLoadCallback);
                  }
                });
              });
            }
          }
          function setOptions(newOptions) {
            var validatedOpts = _pluginsOptions._validate(newOptions, _pluginsOptions._template, true, _currentOptions);
            _currentOptions = extendDeep({}, _currentOptions, validatedOpts._default);
            _currentPreparedOptions = extendDeep({}, _currentPreparedOptions, validatedOpts._prepared);
            return validatedOpts._prepared;
          }
          function setupStructureDOM(destroy) {
            var strParent = "parent";
            var classNameResizeObserverHost = "os-resize-observer-host";
            var classNameTextareaElementFull = _classNameTextareaElement + _strSpace + _classNameTextInherit;
            var textareaClass = _isTextarea ? _strSpace + _classNameTextInherit : _strEmpty;
            var adoptAttrs = _currentPreparedOptions.textarea.inheritedAttrs;
            var adoptAttrsMap = {};
            var applyAdoptedAttrs = function() {
              var applyAdoptedAttrsElm = destroy ? _targetElement : _hostElement;
              each2(adoptAttrsMap, function(key2, value) {
                if (type(value) == TYPES.s) {
                  if (key2 == LEXICON.c)
                    applyAdoptedAttrsElm.addClass(value);
                  else
                    applyAdoptedAttrsElm.attr(key2, value);
                }
              });
            };
            var hostElementClassNames = [
              _classNameHostElement,
              _classNameHostElementForeign,
              _classNameHostTextareaElement,
              _classNameHostResizeDisabled,
              _classNameHostRTL,
              _classNameHostScrollbarHorizontalHidden,
              _classNameHostScrollbarVerticalHidden,
              _classNameHostTransition,
              _classNameHostScrolling,
              _classNameHostOverflow,
              _classNameHostOverflowX,
              _classNameHostOverflowY,
              _classNameThemeNone,
              _classNameTextareaElement,
              _classNameTextInherit,
              _classNameCache
            ].join(_strSpace);
            var hostElementCSS = {};
            _hostElement = _hostElement || (_isTextarea ? _domExists ? _targetElement[strParent]()[strParent]()[strParent]()[strParent]() : FRAMEWORK(generateDiv(_classNameHostTextareaElement)) : _targetElement);
            _contentElement = _contentElement || selectOrGenerateDivByClass(_classNameContentElement + textareaClass);
            _viewportElement = _viewportElement || selectOrGenerateDivByClass(_classNameViewportElement + textareaClass);
            _paddingElement = _paddingElement || selectOrGenerateDivByClass(_classNamePaddingElement + textareaClass);
            _sizeObserverElement = _sizeObserverElement || selectOrGenerateDivByClass(classNameResizeObserverHost);
            _textareaCoverElement = _textareaCoverElement || (_isTextarea ? selectOrGenerateDivByClass(_classNameTextareaCoverElement) : undefined2);
            if (_domExists)
              addClass(_hostElement, _classNameHostElementForeign);
            if (destroy)
              removeClass(_hostElement, hostElementClassNames);
            adoptAttrs = type(adoptAttrs) == TYPES.s ? adoptAttrs.split(_strSpace) : adoptAttrs;
            if (COMPATIBILITY.isA(adoptAttrs) && _isTextarea) {
              each2(adoptAttrs, function(i2, v) {
                if (type(v) == TYPES.s) {
                  adoptAttrsMap[v] = destroy ? _hostElement.attr(v) : _targetElement.attr(v);
                }
              });
            }
            if (!destroy) {
              if (_isTextarea) {
                if (!_currentPreparedOptions.sizeAutoCapable) {
                  hostElementCSS[_strWidth] = _targetElement.css(_strWidth);
                  hostElementCSS[_strHeight] = _targetElement.css(_strHeight);
                }
                if (!_domExists)
                  _targetElement.addClass(_classNameTextInherit).wrap(_hostElement);
                _hostElement = _targetElement[strParent]().css(hostElementCSS);
              }
              if (!_domExists) {
                addClass(_targetElement, _isTextarea ? classNameTextareaElementFull : _classNameHostElement);
                _hostElement.wrapInner(_contentElement).wrapInner(_viewportElement).wrapInner(_paddingElement).prepend(_sizeObserverElement);
                _contentElement = findFirst(_hostElement, _strDot + _classNameContentElement);
                _viewportElement = findFirst(_hostElement, _strDot + _classNameViewportElement);
                _paddingElement = findFirst(_hostElement, _strDot + _classNamePaddingElement);
                if (_isTextarea) {
                  _contentElement.prepend(_textareaCoverElement);
                  applyAdoptedAttrs();
                }
              }
              if (_nativeScrollbarStyling)
                addClass(_viewportElement, _classNameViewportNativeScrollbarsInvisible);
              if (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)
                addClass(_viewportElement, _classNameViewportNativeScrollbarsOverlaid);
              if (_isBody)
                addClass(_htmlElement, _classNameHTMLElement);
              _sizeObserverElementNative = _sizeObserverElement[0];
              _hostElementNative = _hostElement[0];
              _paddingElementNative = _paddingElement[0];
              _viewportElementNative = _viewportElement[0];
              _contentElementNative = _contentElement[0];
              updateViewportAttrsFromTarget();
            } else {
              if (_domExists && _initialized) {
                _sizeObserverElement.children().remove();
                each2([_paddingElement, _viewportElement, _contentElement, _textareaCoverElement], function(i2, elm) {
                  if (elm) {
                    removeClass(elm.removeAttr(LEXICON.s), _classNamesDynamicDestroy);
                  }
                });
                addClass(_hostElement, _isTextarea ? _classNameHostTextareaElement : _classNameHostElement);
              } else {
                remove(_sizeObserverElement);
                _contentElement.contents().unwrap().unwrap().unwrap();
                if (_isTextarea) {
                  _targetElement.unwrap();
                  remove(_hostElement);
                  remove(_textareaCoverElement);
                  applyAdoptedAttrs();
                }
              }
              if (_isTextarea)
                _targetElement.removeAttr(LEXICON.s);
              if (_isBody)
                removeClass(_htmlElement, _classNameHTMLElement);
            }
          }
          function setupStructureEvents() {
            var textareaKeyDownRestrictedKeyCodes = [
              112,
              113,
              114,
              115,
              116,
              117,
              118,
              119,
              120,
              121,
              123,
              33,
              34,
              37,
              38,
              39,
              40,
              16,
              17,
              18,
              19,
              20,
              144
            ];
            var textareaKeyDownKeyCodesList = [];
            var textareaUpdateIntervalID;
            var scrollStopTimeoutId;
            var scrollStopDelay = 175;
            var strFocus = "focus";
            function updateTextarea(doClearInterval) {
              textareaUpdate();
              _base.update(_strAuto);
              if (doClearInterval && _autoUpdateRecommended)
                clearInterval(textareaUpdateIntervalID);
            }
            function textareaOnScroll(event) {
              _targetElement[_strScrollLeft](_rtlScrollBehavior.i && _normalizeRTLCache ? 9999999 : 0);
              _targetElement[_strScrollTop](0);
              COMPATIBILITY.prvD(event);
              COMPATIBILITY.stpP(event);
              return false;
            }
            function textareaOnDrop(event) {
              setTimeout(function() {
                if (!_destroyed)
                  updateTextarea();
              }, 50);
            }
            function textareaOnFocus() {
              _textareaHasFocus = true;
              addClass(_hostElement, strFocus);
            }
            function textareaOnFocusout() {
              _textareaHasFocus = false;
              textareaKeyDownKeyCodesList = [];
              removeClass(_hostElement, strFocus);
              updateTextarea(true);
            }
            function textareaOnKeyDown(event) {
              var keyCode = event.keyCode;
              if (inArray(keyCode, textareaKeyDownRestrictedKeyCodes) < 0) {
                if (!textareaKeyDownKeyCodesList[LEXICON.l]) {
                  updateTextarea();
                  textareaUpdateIntervalID = setInterval(updateTextarea, 1e3 / 60);
                }
                if (inArray(keyCode, textareaKeyDownKeyCodesList) < 0)
                  textareaKeyDownKeyCodesList.push(keyCode);
              }
            }
            function textareaOnKeyUp(event) {
              var keyCode = event.keyCode;
              var index = inArray(keyCode, textareaKeyDownKeyCodesList);
              if (inArray(keyCode, textareaKeyDownRestrictedKeyCodes) < 0) {
                if (index > -1)
                  textareaKeyDownKeyCodesList.splice(index, 1);
                if (!textareaKeyDownKeyCodesList[LEXICON.l])
                  updateTextarea(true);
              }
            }
            function contentOnTransitionEnd(event) {
              if (_autoUpdateCache === true)
                return;
              event = event.originalEvent || event;
              if (isSizeAffectingCSSProperty(event.propertyName))
                _base.update(_strAuto);
            }
            function viewportOnScroll(event) {
              if (!_sleeping) {
                if (scrollStopTimeoutId !== undefined2)
                  clearTimeout(scrollStopTimeoutId);
                else {
                  if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                    refreshScrollbarsAutoHide(true);
                  if (!nativeOverlayScrollbarsAreActive())
                    addClass(_hostElement, _classNameHostScrolling);
                  dispatchCallback("onScrollStart", event);
                }
                if (!_scrollbarsHandlesDefineScrollPos) {
                  refreshScrollbarHandleOffset(true);
                  refreshScrollbarHandleOffset(false);
                }
                dispatchCallback("onScroll", event);
                scrollStopTimeoutId = setTimeout(function() {
                  if (!_destroyed) {
                    clearTimeout(scrollStopTimeoutId);
                    scrollStopTimeoutId = undefined2;
                    if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                      refreshScrollbarsAutoHide(false);
                    if (!nativeOverlayScrollbarsAreActive())
                      removeClass(_hostElement, _classNameHostScrolling);
                    dispatchCallback("onScrollStop", event);
                  }
                }, scrollStopDelay);
              }
            }
            if (_isTextarea) {
              if (_msieVersion > 9 || !_autoUpdateRecommended) {
                addDestroyEventListener(_targetElement, "input", updateTextarea);
              } else {
                addDestroyEventListener(_targetElement, [_strKeyDownEvent, _strKeyUpEvent], [textareaOnKeyDown, textareaOnKeyUp]);
              }
              addDestroyEventListener(_targetElement, [_strScroll, "drop", strFocus, strFocus + "out"], [textareaOnScroll, textareaOnDrop, textareaOnFocus, textareaOnFocusout]);
            } else {
              addDestroyEventListener(_contentElement, _strTransitionEndEvent, contentOnTransitionEnd);
            }
            addDestroyEventListener(_viewportElement, _strScroll, viewportOnScroll, true);
          }
          function setupScrollbarsDOM(destroy) {
            var selectOrGenerateScrollbarDOM = function(isHorizontal) {
              var scrollbarClassName = isHorizontal ? _classNameScrollbarHorizontal : _classNameScrollbarVertical;
              var scrollbar = selectOrGenerateDivByClass(_classNameScrollbar + _strSpace + scrollbarClassName, true);
              var track = selectOrGenerateDivByClass(_classNameScrollbarTrack, scrollbar);
              var handle2 = selectOrGenerateDivByClass(_classNameScrollbarHandle, scrollbar);
              if (!_domExists && !destroy) {
                scrollbar.append(track);
                track.append(handle2);
              }
              return {
                _scrollbar: scrollbar,
                _track: track,
                _handle: handle2
              };
            };
            function resetScrollbarDOM(isHorizontal) {
              var scrollbarVars = getScrollbarVars(isHorizontal);
              var scrollbar = scrollbarVars._scrollbar;
              var track = scrollbarVars._track;
              var handle2 = scrollbarVars._handle;
              if (_domExists && _initialized) {
                each2([scrollbar, track, handle2], function(i2, elm) {
                  removeClass(elm.removeAttr(LEXICON.s), _classNamesDynamicDestroy);
                });
              } else {
                remove(scrollbar || selectOrGenerateScrollbarDOM(isHorizontal)._scrollbar);
              }
            }
            var horizontalElements;
            var verticalElements;
            if (!destroy) {
              horizontalElements = selectOrGenerateScrollbarDOM(true);
              verticalElements = selectOrGenerateScrollbarDOM();
              _scrollbarHorizontalElement = horizontalElements._scrollbar;
              _scrollbarHorizontalTrackElement = horizontalElements._track;
              _scrollbarHorizontalHandleElement = horizontalElements._handle;
              _scrollbarVerticalElement = verticalElements._scrollbar;
              _scrollbarVerticalTrackElement = verticalElements._track;
              _scrollbarVerticalHandleElement = verticalElements._handle;
              if (!_domExists) {
                _paddingElement.after(_scrollbarVerticalElement);
                _paddingElement.after(_scrollbarHorizontalElement);
              }
            } else {
              resetScrollbarDOM(true);
              resetScrollbarDOM();
            }
          }
          function setupScrollbarEvents(isHorizontal) {
            var scrollbarVars = getScrollbarVars(isHorizontal);
            var scrollbarVarsInfo = scrollbarVars._info;
            var insideIFrame = _windowElementNative.top !== _windowElementNative;
            var xy = scrollbarVars._x_y;
            var XY = scrollbarVars._X_Y;
            var scroll = _strScroll + scrollbarVars._Left_Top;
            var strActive = "active";
            var strSnapHandle = "snapHandle";
            var strClickEvent = "click";
            var scrollDurationFactor = 1;
            var increaseDecreaseScrollAmountKeyCodes = [16, 17];
            var trackTimeout;
            var mouseDownScroll;
            var mouseDownOffset;
            var mouseDownInvertedScale;
            function getPointerPosition(event) {
              return _msieVersion && insideIFrame ? event["screen" + XY] : COMPATIBILITY.page(event)[xy];
            }
            function getPreparedScrollbarsOption(name) {
              return _currentPreparedOptions.scrollbars[name];
            }
            function increaseTrackScrollAmount() {
              scrollDurationFactor = 0.5;
            }
            function decreaseTrackScrollAmount() {
              scrollDurationFactor = 1;
            }
            function stopClickEventPropagation(event) {
              COMPATIBILITY.stpP(event);
            }
            function documentKeyDown(event) {
              if (inArray(event.keyCode, increaseDecreaseScrollAmountKeyCodes) > -1)
                increaseTrackScrollAmount();
            }
            function documentKeyUp(event) {
              if (inArray(event.keyCode, increaseDecreaseScrollAmountKeyCodes) > -1)
                decreaseTrackScrollAmount();
            }
            function onMouseTouchDownContinue(event) {
              var originalEvent = event.originalEvent || event;
              var isTouchEvent = originalEvent.touches !== undefined2;
              return _sleeping || _destroyed || nativeOverlayScrollbarsAreActive() || !_scrollbarsDragScrollingCache || isTouchEvent && !getPreparedScrollbarsOption("touchSupport") ? false : COMPATIBILITY.mBtn(event) === 1 || isTouchEvent;
            }
            function documentDragMove(event) {
              if (onMouseTouchDownContinue(event)) {
                var trackLength = scrollbarVarsInfo._trackLength;
                var handleLength = scrollbarVarsInfo._handleLength;
                var scrollRange = scrollbarVarsInfo._maxScroll;
                var scrollRaw = (getPointerPosition(event) - mouseDownOffset) * mouseDownInvertedScale;
                var scrollDeltaPercent = scrollRaw / (trackLength - handleLength);
                var scrollDelta = scrollRange * scrollDeltaPercent;
                scrollDelta = isFinite(scrollDelta) ? scrollDelta : 0;
                if (_isRTL && isHorizontal && !_rtlScrollBehavior.i)
                  scrollDelta *= -1;
                _viewportElement[scroll](MATH.round(mouseDownScroll + scrollDelta));
                if (_scrollbarsHandlesDefineScrollPos)
                  refreshScrollbarHandleOffset(isHorizontal, mouseDownScroll + scrollDelta);
                if (!_supportPassiveEvents)
                  COMPATIBILITY.prvD(event);
              } else
                documentMouseTouchUp(event);
            }
            function documentMouseTouchUp(event) {
              event = event || event.originalEvent;
              setupResponsiveEventListener(_documentElement, [_strMouseTouchMoveEvent, _strMouseTouchUpEvent, _strKeyDownEvent, _strKeyUpEvent, _strSelectStartEvent], [documentDragMove, documentMouseTouchUp, documentKeyDown, documentKeyUp, documentOnSelectStart], true);
              COMPATIBILITY.rAF()(function() {
                setupResponsiveEventListener(_documentElement, strClickEvent, stopClickEventPropagation, true, { _capture: true });
              });
              if (_scrollbarsHandlesDefineScrollPos)
                refreshScrollbarHandleOffset(isHorizontal, true);
              _scrollbarsHandlesDefineScrollPos = false;
              removeClass(_bodyElement, _classNameDragging);
              removeClass(scrollbarVars._handle, strActive);
              removeClass(scrollbarVars._track, strActive);
              removeClass(scrollbarVars._scrollbar, strActive);
              mouseDownScroll = undefined2;
              mouseDownOffset = undefined2;
              mouseDownInvertedScale = 1;
              decreaseTrackScrollAmount();
              if (trackTimeout !== undefined2) {
                _base.scrollStop();
                clearTimeout(trackTimeout);
                trackTimeout = undefined2;
              }
              if (event) {
                var rect = _hostElementNative[LEXICON.bCR]();
                var mouseInsideHost = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
                if (!mouseInsideHost)
                  hostOnMouseLeave();
                if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                  refreshScrollbarsAutoHide(false);
              }
            }
            function onHandleMouseTouchDown(event) {
              if (onMouseTouchDownContinue(event))
                onHandleMouseTouchDownAction(event);
            }
            function onHandleMouseTouchDownAction(event) {
              mouseDownScroll = _viewportElement[scroll]();
              mouseDownScroll = isNaN(mouseDownScroll) ? 0 : mouseDownScroll;
              if (_isRTL && isHorizontal && !_rtlScrollBehavior.n || !_isRTL)
                mouseDownScroll = mouseDownScroll < 0 ? 0 : mouseDownScroll;
              mouseDownInvertedScale = getHostElementInvertedScale()[xy];
              mouseDownOffset = getPointerPosition(event);
              _scrollbarsHandlesDefineScrollPos = !getPreparedScrollbarsOption(strSnapHandle);
              addClass(_bodyElement, _classNameDragging);
              addClass(scrollbarVars._handle, strActive);
              addClass(scrollbarVars._scrollbar, strActive);
              setupResponsiveEventListener(_documentElement, [_strMouseTouchMoveEvent, _strMouseTouchUpEvent, _strSelectStartEvent], [documentDragMove, documentMouseTouchUp, documentOnSelectStart]);
              COMPATIBILITY.rAF()(function() {
                setupResponsiveEventListener(_documentElement, strClickEvent, stopClickEventPropagation, false, { _capture: true });
              });
              if (_msieVersion || !_documentMixed)
                COMPATIBILITY.prvD(event);
              COMPATIBILITY.stpP(event);
            }
            function onTrackMouseTouchDown(event) {
              if (onMouseTouchDownContinue(event)) {
                var handleToViewportRatio = scrollbarVars._info._handleLength / Math.round(MATH.min(1, _viewportSize[scrollbarVars._w_h] / _contentScrollSizeCache[scrollbarVars._w_h]) * scrollbarVars._info._trackLength);
                var scrollDistance = MATH.round(_viewportSize[scrollbarVars._w_h] * handleToViewportRatio);
                var scrollBaseDuration = 270 * handleToViewportRatio;
                var scrollFirstIterationDelay = 400 * handleToViewportRatio;
                var trackOffset = scrollbarVars._track.offset()[scrollbarVars._left_top];
                var ctrlKey = event.ctrlKey;
                var instantScroll = event.shiftKey;
                var instantScrollTransition = instantScroll && ctrlKey;
                var isFirstIteration = true;
                var easing = "linear";
                var decreaseScroll;
                var finishedCondition;
                var scrollActionFinsished = function(transition) {
                  if (_scrollbarsHandlesDefineScrollPos)
                    refreshScrollbarHandleOffset(isHorizontal, transition);
                };
                var scrollActionInstantFinished = function() {
                  scrollActionFinsished();
                  onHandleMouseTouchDownAction(event);
                };
                var scrollAction = function() {
                  if (!_destroyed) {
                    var mouseOffset = (mouseDownOffset - trackOffset) * mouseDownInvertedScale;
                    var handleOffset = scrollbarVarsInfo._handleOffset;
                    var trackLength = scrollbarVarsInfo._trackLength;
                    var handleLength = scrollbarVarsInfo._handleLength;
                    var scrollRange = scrollbarVarsInfo._maxScroll;
                    var currScroll = scrollbarVarsInfo._currentScroll;
                    var scrollDuration = scrollBaseDuration * scrollDurationFactor;
                    var timeoutDelay = isFirstIteration ? MATH.max(scrollFirstIterationDelay, scrollDuration) : scrollDuration;
                    var instantScrollPosition = scrollRange * ((mouseOffset - handleLength / 2) / (trackLength - handleLength));
                    var rtlIsNormal = _isRTL && isHorizontal && (!_rtlScrollBehavior.i && !_rtlScrollBehavior.n || _normalizeRTLCache);
                    var decreaseScrollCondition = rtlIsNormal ? handleOffset < mouseOffset : handleOffset > mouseOffset;
                    var scrollObj = {};
                    var animationObj = {
                      easing,
                      step: function(now) {
                        if (_scrollbarsHandlesDefineScrollPos) {
                          _viewportElement[scroll](now);
                          refreshScrollbarHandleOffset(isHorizontal, now);
                        }
                      }
                    };
                    instantScrollPosition = isFinite(instantScrollPosition) ? instantScrollPosition : 0;
                    instantScrollPosition = _isRTL && isHorizontal && !_rtlScrollBehavior.i ? scrollRange - instantScrollPosition : instantScrollPosition;
                    if (instantScroll) {
                      _viewportElement[scroll](instantScrollPosition);
                      if (instantScrollTransition) {
                        instantScrollPosition = _viewportElement[scroll]();
                        _viewportElement[scroll](currScroll);
                        instantScrollPosition = rtlIsNormal && _rtlScrollBehavior.i ? scrollRange - instantScrollPosition : instantScrollPosition;
                        instantScrollPosition = rtlIsNormal && _rtlScrollBehavior.n ? -instantScrollPosition : instantScrollPosition;
                        scrollObj[xy] = instantScrollPosition;
                        _base.scroll(scrollObj, extendDeep(animationObj, {
                          duration: 130,
                          complete: scrollActionInstantFinished
                        }));
                      } else
                        scrollActionInstantFinished();
                    } else {
                      decreaseScroll = isFirstIteration ? decreaseScrollCondition : decreaseScroll;
                      finishedCondition = rtlIsNormal ? decreaseScroll ? handleOffset + handleLength >= mouseOffset : handleOffset <= mouseOffset : decreaseScroll ? handleOffset <= mouseOffset : handleOffset + handleLength >= mouseOffset;
                      if (finishedCondition) {
                        clearTimeout(trackTimeout);
                        _base.scrollStop();
                        trackTimeout = undefined2;
                        scrollActionFinsished(true);
                      } else {
                        trackTimeout = setTimeout(scrollAction, timeoutDelay);
                        scrollObj[xy] = (decreaseScroll ? "-=" : "+=") + scrollDistance;
                        _base.scroll(scrollObj, extendDeep(animationObj, {
                          duration: scrollDuration
                        }));
                      }
                      isFirstIteration = false;
                    }
                  }
                };
                if (ctrlKey)
                  increaseTrackScrollAmount();
                mouseDownInvertedScale = getHostElementInvertedScale()[xy];
                mouseDownOffset = COMPATIBILITY.page(event)[xy];
                _scrollbarsHandlesDefineScrollPos = !getPreparedScrollbarsOption(strSnapHandle);
                addClass(_bodyElement, _classNameDragging);
                addClass(scrollbarVars._track, strActive);
                addClass(scrollbarVars._scrollbar, strActive);
                setupResponsiveEventListener(_documentElement, [_strMouseTouchUpEvent, _strKeyDownEvent, _strKeyUpEvent, _strSelectStartEvent], [documentMouseTouchUp, documentKeyDown, documentKeyUp, documentOnSelectStart]);
                scrollAction();
                COMPATIBILITY.prvD(event);
                COMPATIBILITY.stpP(event);
              }
            }
            function onTrackMouseTouchEnter(event) {
              _scrollbarsHandleHovered = true;
              if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                refreshScrollbarsAutoHide(true);
            }
            function onTrackMouseTouchLeave(event) {
              _scrollbarsHandleHovered = false;
              if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove)
                refreshScrollbarsAutoHide(false);
            }
            function onScrollbarMouseTouchDown(event) {
              COMPATIBILITY.stpP(event);
            }
            addDestroyEventListener(scrollbarVars._handle, _strMouseTouchDownEvent, onHandleMouseTouchDown);
            addDestroyEventListener(scrollbarVars._track, [_strMouseTouchDownEvent, _strMouseEnter, _strMouseLeave], [onTrackMouseTouchDown, onTrackMouseTouchEnter, onTrackMouseTouchLeave]);
            addDestroyEventListener(scrollbarVars._scrollbar, _strMouseTouchDownEvent, onScrollbarMouseTouchDown);
            if (_supportTransition) {
              addDestroyEventListener(scrollbarVars._scrollbar, _strTransitionEndEvent, function(event) {
                if (event.target !== scrollbarVars._scrollbar[0])
                  return;
                refreshScrollbarHandleLength(isHorizontal);
                refreshScrollbarHandleOffset(isHorizontal);
              });
            }
          }
          function refreshScrollbarAppearance(isHorizontal, shallBeVisible, canScroll) {
            var scrollbarHiddenClassName = isHorizontal ? _classNameHostScrollbarHorizontalHidden : _classNameHostScrollbarVerticalHidden;
            var scrollbarElement = isHorizontal ? _scrollbarHorizontalElement : _scrollbarVerticalElement;
            addRemoveClass(_hostElement, scrollbarHiddenClassName, !shallBeVisible);
            addRemoveClass(scrollbarElement, _classNameScrollbarUnusable, !canScroll);
          }
          function refreshScrollbarsAutoHide(shallBeVisible, delayfree) {
            clearTimeout(_scrollbarsAutoHideTimeoutId);
            if (shallBeVisible) {
              removeClass(_scrollbarHorizontalElement, _classNameScrollbarAutoHidden);
              removeClass(_scrollbarVerticalElement, _classNameScrollbarAutoHidden);
            } else {
              var anyActive;
              var strActive = "active";
              var hide = function() {
                if (!_scrollbarsHandleHovered && !_destroyed) {
                  anyActive = _scrollbarHorizontalHandleElement.hasClass(strActive) || _scrollbarVerticalHandleElement.hasClass(strActive);
                  if (!anyActive && (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove || _scrollbarsAutoHideLeave))
                    addClass(_scrollbarHorizontalElement, _classNameScrollbarAutoHidden);
                  if (!anyActive && (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove || _scrollbarsAutoHideLeave))
                    addClass(_scrollbarVerticalElement, _classNameScrollbarAutoHidden);
                }
              };
              if (_scrollbarsAutoHideDelay > 0 && delayfree !== true)
                _scrollbarsAutoHideTimeoutId = setTimeout(hide, _scrollbarsAutoHideDelay);
              else
                hide();
            }
          }
          function refreshScrollbarHandleLength(isHorizontal) {
            var handleCSS = {};
            var scrollbarVars = getScrollbarVars(isHorizontal);
            var scrollbarVarsInfo = scrollbarVars._info;
            var digit = 1e6;
            var handleRatio = MATH.min(1, _viewportSize[scrollbarVars._w_h] / _contentScrollSizeCache[scrollbarVars._w_h]);
            handleCSS[scrollbarVars._width_height] = MATH.floor(handleRatio * 100 * digit) / digit + "%";
            if (!nativeOverlayScrollbarsAreActive())
              scrollbarVars._handle.css(handleCSS);
            scrollbarVarsInfo._handleLength = scrollbarVars._handle[0]["offset" + scrollbarVars._Width_Height];
            scrollbarVarsInfo._handleLengthRatio = handleRatio;
          }
          function refreshScrollbarHandleOffset(isHorizontal, scrollOrTransition) {
            var transition = type(scrollOrTransition) == TYPES.b;
            var transitionDuration = 250;
            var isRTLisHorizontal = _isRTL && isHorizontal;
            var scrollbarVars = getScrollbarVars(isHorizontal);
            var scrollbarVarsInfo = scrollbarVars._info;
            var strTranslateBrace = "translate(";
            var strTransform = VENDORS._cssProperty("transform");
            var strTransition = VENDORS._cssProperty("transition");
            var nativeScroll = isHorizontal ? _viewportElement[_strScrollLeft]() : _viewportElement[_strScrollTop]();
            var currentScroll = scrollOrTransition === undefined2 || transition ? nativeScroll : scrollOrTransition;
            var handleLength = scrollbarVarsInfo._handleLength;
            var trackLength = scrollbarVars._track[0]["offset" + scrollbarVars._Width_Height];
            var handleTrackDiff = trackLength - handleLength;
            var handleCSS = {};
            var transformOffset;
            var translateValue;
            var maxScroll = (_viewportElementNative[_strScroll + scrollbarVars._Width_Height] - _viewportElementNative["client" + scrollbarVars._Width_Height]) * (_rtlScrollBehavior.n && isRTLisHorizontal ? -1 : 1);
            var getScrollRatio = function(base2) {
              return isNaN(base2 / maxScroll) ? 0 : MATH.max(0, MATH.min(1, base2 / maxScroll));
            };
            var getHandleOffset = function(scrollRatio2) {
              var offset = handleTrackDiff * scrollRatio2;
              offset = isNaN(offset) ? 0 : offset;
              offset = isRTLisHorizontal && !_rtlScrollBehavior.i ? trackLength - handleLength - offset : offset;
              offset = MATH.max(0, offset);
              return offset;
            };
            var scrollRatio = getScrollRatio(nativeScroll);
            var unsnappedScrollRatio = getScrollRatio(currentScroll);
            var handleOffset = getHandleOffset(unsnappedScrollRatio);
            var snappedHandleOffset = getHandleOffset(scrollRatio);
            scrollbarVarsInfo._maxScroll = maxScroll;
            scrollbarVarsInfo._currentScroll = nativeScroll;
            scrollbarVarsInfo._currentScrollRatio = scrollRatio;
            if (_supportTransform) {
              transformOffset = isRTLisHorizontal ? -(trackLength - handleLength - handleOffset) : handleOffset;
              translateValue = isHorizontal ? strTranslateBrace + transformOffset + "px, 0)" : strTranslateBrace + "0, " + transformOffset + "px)";
              handleCSS[strTransform] = translateValue;
              if (_supportTransition)
                handleCSS[strTransition] = transition && MATH.abs(handleOffset - scrollbarVarsInfo._handleOffset) > 1 ? getCSSTransitionString(scrollbarVars._handle) + ", " + (strTransform + _strSpace + transitionDuration + "ms") : _strEmpty;
            } else
              handleCSS[scrollbarVars._left_top] = handleOffset;
            if (!nativeOverlayScrollbarsAreActive()) {
              scrollbarVars._handle.css(handleCSS);
              if (_supportTransform && _supportTransition && transition) {
                scrollbarVars._handle.one(_strTransitionEndEvent, function() {
                  if (!_destroyed)
                    scrollbarVars._handle.css(strTransition, _strEmpty);
                });
              }
            }
            scrollbarVarsInfo._handleOffset = handleOffset;
            scrollbarVarsInfo._snappedHandleOffset = snappedHandleOffset;
            scrollbarVarsInfo._trackLength = trackLength;
          }
          function refreshScrollbarsInteractive(isTrack, value) {
            var action = value ? "removeClass" : "addClass";
            var element1 = isTrack ? _scrollbarHorizontalTrackElement : _scrollbarHorizontalHandleElement;
            var element2 = isTrack ? _scrollbarVerticalTrackElement : _scrollbarVerticalHandleElement;
            var className = isTrack ? _classNameScrollbarTrackOff : _classNameScrollbarHandleOff;
            element1[action](className);
            element2[action](className);
          }
          function getScrollbarVars(isHorizontal) {
            return {
              _width_height: isHorizontal ? _strWidth : _strHeight,
              _Width_Height: isHorizontal ? "Width" : "Height",
              _left_top: isHorizontal ? _strLeft : _strTop,
              _Left_Top: isHorizontal ? "Left" : "Top",
              _x_y: isHorizontal ? _strX : _strY,
              _X_Y: isHorizontal ? "X" : "Y",
              _w_h: isHorizontal ? "w" : "h",
              _l_t: isHorizontal ? "l" : "t",
              _track: isHorizontal ? _scrollbarHorizontalTrackElement : _scrollbarVerticalTrackElement,
              _handle: isHorizontal ? _scrollbarHorizontalHandleElement : _scrollbarVerticalHandleElement,
              _scrollbar: isHorizontal ? _scrollbarHorizontalElement : _scrollbarVerticalElement,
              _info: isHorizontal ? _scrollHorizontalInfo : _scrollVerticalInfo
            };
          }
          function setupScrollbarCornerDOM(destroy) {
            _scrollbarCornerElement = _scrollbarCornerElement || selectOrGenerateDivByClass(_classNameScrollbarCorner, true);
            if (!destroy) {
              if (!_domExists) {
                _hostElement.append(_scrollbarCornerElement);
              }
            } else {
              if (_domExists && _initialized) {
                removeClass(_scrollbarCornerElement.removeAttr(LEXICON.s), _classNamesDynamicDestroy);
              } else {
                remove(_scrollbarCornerElement);
              }
            }
          }
          function setupScrollbarCornerEvents() {
            var insideIFrame = _windowElementNative.top !== _windowElementNative;
            var mouseDownPosition = {};
            var mouseDownSize = {};
            var mouseDownInvertedScale = {};
            var reconnectMutationObserver;
            function documentDragMove(event) {
              if (onMouseTouchDownContinue(event)) {
                var pageOffset = getCoordinates(event);
                var hostElementCSS = {};
                if (_resizeHorizontal || _resizeBoth)
                  hostElementCSS[_strWidth] = mouseDownSize.w + (pageOffset.x - mouseDownPosition.x) * mouseDownInvertedScale.x;
                if (_resizeVertical || _resizeBoth)
                  hostElementCSS[_strHeight] = mouseDownSize.h + (pageOffset.y - mouseDownPosition.y) * mouseDownInvertedScale.y;
                _hostElement.css(hostElementCSS);
                COMPATIBILITY.stpP(event);
              } else {
                documentMouseTouchUp(event);
              }
            }
            function documentMouseTouchUp(event) {
              var eventIsTrusted = event !== undefined2;
              setupResponsiveEventListener(_documentElement, [_strSelectStartEvent, _strMouseTouchMoveEvent, _strMouseTouchUpEvent], [documentOnSelectStart, documentDragMove, documentMouseTouchUp], true);
              removeClass(_bodyElement, _classNameDragging);
              if (_scrollbarCornerElement.releaseCapture)
                _scrollbarCornerElement.releaseCapture();
              if (eventIsTrusted) {
                if (reconnectMutationObserver)
                  connectMutationObservers();
                _base.update(_strAuto);
              }
              reconnectMutationObserver = false;
            }
            function onMouseTouchDownContinue(event) {
              var originalEvent = event.originalEvent || event;
              var isTouchEvent = originalEvent.touches !== undefined2;
              return _sleeping || _destroyed ? false : COMPATIBILITY.mBtn(event) === 1 || isTouchEvent;
            }
            function getCoordinates(event) {
              return _msieVersion && insideIFrame ? { x: event.screenX, y: event.screenY } : COMPATIBILITY.page(event);
            }
            addDestroyEventListener(_scrollbarCornerElement, _strMouseTouchDownEvent, function(event) {
              if (onMouseTouchDownContinue(event) && !_resizeNone) {
                if (_mutationObserversConnected) {
                  reconnectMutationObserver = true;
                  disconnectMutationObservers();
                }
                mouseDownPosition = getCoordinates(event);
                mouseDownSize.w = _hostElementNative[LEXICON.oW] - (!_isBorderBox ? _paddingX : 0);
                mouseDownSize.h = _hostElementNative[LEXICON.oH] - (!_isBorderBox ? _paddingY : 0);
                mouseDownInvertedScale = getHostElementInvertedScale();
                setupResponsiveEventListener(_documentElement, [_strSelectStartEvent, _strMouseTouchMoveEvent, _strMouseTouchUpEvent], [documentOnSelectStart, documentDragMove, documentMouseTouchUp]);
                addClass(_bodyElement, _classNameDragging);
                if (_scrollbarCornerElement.setCapture)
                  _scrollbarCornerElement.setCapture();
                COMPATIBILITY.prvD(event);
                COMPATIBILITY.stpP(event);
              }
            });
          }
          function dispatchCallback(name, args, dependent) {
            if (dependent === false)
              return;
            if (_initialized) {
              var callback = _currentPreparedOptions.callbacks[name];
              var extensionOnName = name;
              var ext;
              if (extensionOnName.substr(0, 2) === "on")
                extensionOnName = extensionOnName.substr(2, 1).toLowerCase() + extensionOnName.substr(3);
              if (type(callback) == TYPES.f)
                callback.call(_base, args);
              each2(_extensions, function() {
                ext = this;
                if (type(ext.on) == TYPES.f)
                  ext.on(extensionOnName, args);
              });
            } else if (!_destroyed)
              _callbacksInitQeueue.push({ n: name, a: args });
          }
          function setTopRightBottomLeft(targetCSSObject, prefix, values) {
            prefix = prefix || _strEmpty;
            values = values || [_strEmpty, _strEmpty, _strEmpty, _strEmpty];
            targetCSSObject[prefix + _strTop] = values[0];
            targetCSSObject[prefix + _strRight] = values[1];
            targetCSSObject[prefix + _strBottom] = values[2];
            targetCSSObject[prefix + _strLeft] = values[3];
          }
          function getTopRightBottomLeftHost(prefix, suffix, zeroX, zeroY) {
            suffix = suffix || _strEmpty;
            prefix = prefix || _strEmpty;
            return {
              t: zeroY ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strTop + suffix)),
              r: zeroX ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strRight + suffix)),
              b: zeroY ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strBottom + suffix)),
              l: zeroX ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strLeft + suffix))
            };
          }
          function getCSSTransitionString(element) {
            var transitionStr = VENDORS._cssProperty("transition");
            var assembledValue = element.css(transitionStr);
            if (assembledValue)
              return assembledValue;
            var regExpString = "\\s*(([^,(]+(\\(.+?\\))?)+)[\\s,]*";
            var regExpMain = new RegExp(regExpString);
            var regExpValidate = new RegExp("^(" + regExpString + ")+$");
            var properties = "property duration timing-function delay".split(" ");
            var result = [];
            var strResult;
            var valueArray;
            var i2 = 0;
            var j;
            var splitCssStyleByComma = function(str) {
              strResult = [];
              if (!str.match(regExpValidate))
                return str;
              while (str.match(regExpMain)) {
                strResult.push(RegExp.$1);
                str = str.replace(regExpMain, _strEmpty);
              }
              return strResult;
            };
            for (; i2 < properties[LEXICON.l]; i2++) {
              valueArray = splitCssStyleByComma(element.css(transitionStr + "-" + properties[i2]));
              for (j = 0; j < valueArray[LEXICON.l]; j++)
                result[j] = (result[j] ? result[j] + _strSpace : _strEmpty) + valueArray[j];
            }
            return result.join(", ");
          }
          function createHostClassNameRegExp(withCurrClassNameOption, withOldClassNameOption) {
            var i2;
            var split;
            var appendix;
            var appendClasses = function(classes, condition) {
              appendix = "";
              if (condition && typeof classes == TYPES.s) {
                split = classes.split(_strSpace);
                for (i2 = 0; i2 < split[LEXICON.l]; i2++)
                  appendix += "|" + split[i2] + "$";
              }
              return appendix;
            };
            return new RegExp("(^" + _classNameHostElement + "([-_].+|)$)" + appendClasses(_classNameCache, withCurrClassNameOption) + appendClasses(_oldClassName, withOldClassNameOption), "g");
          }
          function getHostElementInvertedScale() {
            var rect = _paddingElementNative[LEXICON.bCR]();
            return {
              x: _supportTransform ? 1 / (MATH.round(rect.width) / _paddingElementNative[LEXICON.oW]) || 1 : 1,
              y: _supportTransform ? 1 / (MATH.round(rect.height) / _paddingElementNative[LEXICON.oH]) || 1 : 1
            };
          }
          function isHTMLElement(o) {
            var strOwnerDocument = "ownerDocument";
            var strHTMLElement = "HTMLElement";
            var wnd = o && o[strOwnerDocument] ? o[strOwnerDocument].parentWindow || window2 : window2;
            return typeof wnd[strHTMLElement] == TYPES.o ? o instanceof wnd[strHTMLElement] : o && typeof o == TYPES.o && o !== null && o.nodeType === 1 && typeof o.nodeName == TYPES.s;
          }
          function getArrayDifferences(a1, a2) {
            var a = [];
            var diff = [];
            var i2;
            var k;
            for (i2 = 0; i2 < a1.length; i2++)
              a[a1[i2]] = true;
            for (i2 = 0; i2 < a2.length; i2++) {
              if (a[a2[i2]])
                delete a[a2[i2]];
              else
                a[a2[i2]] = true;
            }
            for (k in a)
              diff.push(k);
            return diff;
          }
          function parseToZeroOrNumber(value, toFloat) {
            var num = toFloat ? parseFloat(value) : parseInt(value, 10);
            return isNaN(num) ? 0 : num;
          }
          function getTextareaInfo() {
            var textareaCursorPosition = _targetElementNative.selectionStart;
            if (textareaCursorPosition === undefined2)
              return;
            var textareaValue = _targetElement.val();
            var textareaLength = textareaValue[LEXICON.l];
            var textareaRowSplit = textareaValue.split("\n");
            var textareaLastRow = textareaRowSplit[LEXICON.l];
            var textareaCurrentCursorRowSplit = textareaValue.substr(0, textareaCursorPosition).split("\n");
            var widestRow = 0;
            var textareaLastCol = 0;
            var cursorRow = textareaCurrentCursorRowSplit[LEXICON.l];
            var cursorCol = textareaCurrentCursorRowSplit[textareaCurrentCursorRowSplit[LEXICON.l] - 1][LEXICON.l];
            var rowCols;
            var i2;
            for (i2 = 0; i2 < textareaRowSplit[LEXICON.l]; i2++) {
              rowCols = textareaRowSplit[i2][LEXICON.l];
              if (rowCols > textareaLastCol) {
                widestRow = i2 + 1;
                textareaLastCol = rowCols;
              }
            }
            return {
              _cursorRow: cursorRow,
              _cursorColumn: cursorCol,
              _rows: textareaLastRow,
              _columns: textareaLastCol,
              _widestRow: widestRow,
              _cursorPosition: textareaCursorPosition,
              _cursorMax: textareaLength
            };
          }
          function nativeOverlayScrollbarsAreActive() {
            return _ignoreOverlayScrollbarHidingCache && (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y);
          }
          function getContentMeasureElement() {
            return _isTextarea ? _textareaCoverElement[0] : _contentElementNative;
          }
          function generateDiv(classesOrAttrs, content) {
            return "<div " + (classesOrAttrs ? type(classesOrAttrs) == TYPES.s ? 'class="' + classesOrAttrs + '"' : function() {
              var key2;
              var attrs = _strEmpty;
              if (FRAMEWORK.isPlainObject(classesOrAttrs)) {
                for (key2 in classesOrAttrs)
                  attrs += (key2 === "c" ? "class" : key2) + '="' + classesOrAttrs[key2] + '" ';
              }
              return attrs;
            }() : _strEmpty) + ">" + (content || _strEmpty) + "</div>";
          }
          function selectOrGenerateDivByClass(className, selectParentOrOnlyChildren) {
            var onlyChildren = type(selectParentOrOnlyChildren) == TYPES.b;
            var selectParent = onlyChildren ? _hostElement : selectParentOrOnlyChildren || _hostElement;
            return _domExists && !selectParent[LEXICON.l] ? null : _domExists ? selectParent[onlyChildren ? "children" : "find"](_strDot + className.replace(/\s/g, _strDot)).eq(0) : FRAMEWORK(generateDiv(className));
          }
          function getObjectPropVal(obj, path) {
            var splits = path.split(_strDot);
            var i2 = 0;
            var val;
            for (; i2 < splits.length; i2++) {
              if (!obj[LEXICON.hOP](splits[i2]))
                return;
              val = obj[splits[i2]];
              if (i2 < splits.length && type(val) == TYPES.o)
                obj = val;
            }
            return val;
          }
          function setObjectPropVal(obj, path, val) {
            var splits = path.split(_strDot);
            var splitsLength = splits.length;
            var i2 = 0;
            var extendObj = {};
            var extendObjRoot = extendObj;
            for (; i2 < splitsLength; i2++)
              extendObj = extendObj[splits[i2]] = i2 + 1 < splitsLength ? {} : val;
            FRAMEWORK.extend(obj, extendObjRoot, true);
          }
          function eachUpdateOnLoad(action) {
            var updateOnLoad = _currentPreparedOptions.updateOnLoad;
            updateOnLoad = type(updateOnLoad) == TYPES.s ? updateOnLoad.split(_strSpace) : updateOnLoad;
            if (COMPATIBILITY.isA(updateOnLoad) && !_destroyed) {
              each2(updateOnLoad, action);
            }
          }
          function checkCache(current, cache, force) {
            if (force)
              return force;
            if (type(current) == TYPES.o && type(cache) == TYPES.o) {
              for (var prop in current) {
                if (prop !== "c") {
                  if (current[LEXICON.hOP](prop) && cache[LEXICON.hOP](prop)) {
                    if (checkCache(current[prop], cache[prop]))
                      return true;
                  } else {
                    return true;
                  }
                }
              }
            } else {
              return current !== cache;
            }
            return false;
          }
          function extendDeep() {
            return FRAMEWORK.extend.apply(this, [true].concat([].slice.call(arguments)));
          }
          function addClass(el, classes) {
            return _frameworkProto.addClass.call(el, classes);
          }
          function removeClass(el, classes) {
            return _frameworkProto.removeClass.call(el, classes);
          }
          function addRemoveClass(el, classes, doAdd) {
            return doAdd ? addClass(el, classes) : removeClass(el, classes);
          }
          function remove(el) {
            return _frameworkProto.remove.call(el);
          }
          function findFirst(el, selector) {
            return _frameworkProto.find.call(el, selector).eq(0);
          }
          _base.sleep = function() {
            _sleeping = true;
          };
          _base.update = function(force) {
            if (_destroyed)
              return;
            var attrsChanged;
            var contentSizeC;
            var isString = type(force) == TYPES.s;
            var doUpdateAuto;
            var mutHost;
            var mutContent;
            if (isString) {
              if (force === _strAuto) {
                attrsChanged = meaningfulAttrsChanged();
                contentSizeC = updateAutoContentSizeChanged();
                doUpdateAuto = attrsChanged || contentSizeC;
                if (doUpdateAuto) {
                  update({
                    _contentSizeChanged: contentSizeC,
                    _changedOptions: _initialized ? undefined2 : _currentPreparedOptions
                  });
                }
              } else if (force === _strSync) {
                if (_mutationObserversConnected) {
                  mutHost = _mutationObserverHostCallback(_mutationObserverHost.takeRecords());
                  mutContent = _mutationObserverContentCallback(_mutationObserverContent.takeRecords());
                } else {
                  mutHost = _base.update(_strAuto);
                }
              } else if (force === "zoom") {
                update({
                  _hostSizeChanged: true,
                  _contentSizeChanged: true
                });
              }
            } else {
              force = _sleeping || force;
              _sleeping = false;
              if (!_base.update(_strSync) || force)
                update({ _force: force });
            }
            updateElementsOnLoad();
            return doUpdateAuto || mutHost || mutContent;
          };
          _base.options = function(newOptions, value) {
            var option = {};
            var changedOps;
            if (FRAMEWORK.isEmptyObject(newOptions) || !FRAMEWORK.isPlainObject(newOptions)) {
              if (type(newOptions) == TYPES.s) {
                if (arguments.length > 1) {
                  setObjectPropVal(option, newOptions, value);
                  changedOps = setOptions(option);
                } else
                  return getObjectPropVal(_currentOptions, newOptions);
              } else
                return _currentOptions;
            } else {
              changedOps = setOptions(newOptions);
            }
            if (!FRAMEWORK.isEmptyObject(changedOps)) {
              update({ _changedOptions: changedOps });
            }
          };
          _base.destroy = function() {
            if (_destroyed)
              return;
            autoUpdateLoop.remove(_base);
            disconnectMutationObservers();
            setupResizeObserver(_sizeObserverElement);
            setupResizeObserver(_sizeAutoObserverElement);
            for (var extName in _extensions)
              _base.removeExt(extName);
            while (_destroyEvents[LEXICON.l] > 0)
              _destroyEvents.pop()();
            setupHostMouseTouchEvents(true);
            if (_contentGlueElement)
              remove(_contentGlueElement);
            if (_contentArrangeElement)
              remove(_contentArrangeElement);
            if (_sizeAutoObserverAdded)
              remove(_sizeAutoObserverElement);
            setupScrollbarsDOM(true);
            setupScrollbarCornerDOM(true);
            setupStructureDOM(true);
            for (var i2 = 0; i2 < _updateOnLoadElms[LEXICON.l]; i2++)
              FRAMEWORK(_updateOnLoadElms[i2]).off(_updateOnLoadEventName, updateOnLoadCallback);
            _updateOnLoadElms = undefined2;
            _destroyed = true;
            _sleeping = true;
            INSTANCES(pluginTargetElement, 0);
            dispatchCallback("onDestroyed");
          };
          _base.scroll = function(coordinates, duration, easing, complete) {
            if (arguments.length === 0 || coordinates === undefined2) {
              var infoX = _scrollHorizontalInfo;
              var infoY = _scrollVerticalInfo;
              var normalizeInvert = _normalizeRTLCache && _isRTL && _rtlScrollBehavior.i;
              var normalizeNegate = _normalizeRTLCache && _isRTL && _rtlScrollBehavior.n;
              var scrollX = infoX._currentScroll;
              var scrollXRatio = infoX._currentScrollRatio;
              var maxScrollX = infoX._maxScroll;
              scrollXRatio = normalizeInvert ? 1 - scrollXRatio : scrollXRatio;
              scrollX = normalizeInvert ? maxScrollX - scrollX : scrollX;
              scrollX *= normalizeNegate ? -1 : 1;
              maxScrollX *= normalizeNegate ? -1 : 1;
              return {
                position: {
                  x: scrollX,
                  y: infoY._currentScroll
                },
                ratio: {
                  x: scrollXRatio,
                  y: infoY._currentScrollRatio
                },
                max: {
                  x: maxScrollX,
                  y: infoY._maxScroll
                },
                handleOffset: {
                  x: infoX._handleOffset,
                  y: infoY._handleOffset
                },
                handleLength: {
                  x: infoX._handleLength,
                  y: infoY._handleLength
                },
                handleLengthRatio: {
                  x: infoX._handleLengthRatio,
                  y: infoY._handleLengthRatio
                },
                trackLength: {
                  x: infoX._trackLength,
                  y: infoY._trackLength
                },
                snappedHandleOffset: {
                  x: infoX._snappedHandleOffset,
                  y: infoY._snappedHandleOffset
                },
                isRTL: _isRTL,
                isRTLNormalized: _normalizeRTLCache
              };
            }
            _base.update(_strSync);
            var normalizeRTL = _normalizeRTLCache;
            var coordinatesXAxisProps = [_strX, _strLeft, "l"];
            var coordinatesYAxisProps = [_strY, _strTop, "t"];
            var coordinatesOperators = ["+=", "-=", "*=", "/="];
            var durationIsObject = type(duration) == TYPES.o;
            var completeCallback = durationIsObject ? duration.complete : complete;
            var i2;
            var finalScroll = {};
            var specialEasing = {};
            var doScrollLeft;
            var doScrollTop;
            var animationOptions;
            var strEnd = "end";
            var strBegin = "begin";
            var strCenter = "center";
            var strNearest = "nearest";
            var strAlways = "always";
            var strNever = "never";
            var strIfNeeded = "ifneeded";
            var strLength = LEXICON.l;
            var settingsAxis;
            var settingsScroll;
            var settingsBlock;
            var settingsMargin;
            var finalElement;
            var elementObjSettingsAxisValues = [_strX, _strY, "xy", "yx"];
            var elementObjSettingsBlockValues = [strBegin, strEnd, strCenter, strNearest];
            var elementObjSettingsScrollValues = [strAlways, strNever, strIfNeeded];
            var coordinatesIsElementObj = coordinates[LEXICON.hOP]("el");
            var possibleElement = coordinatesIsElementObj ? coordinates.el : coordinates;
            var possibleElementIsJQuery = possibleElement instanceof FRAMEWORK || JQUERY ? possibleElement instanceof JQUERY : false;
            var possibleElementIsHTMLElement = possibleElementIsJQuery ? false : isHTMLElement(possibleElement);
            var updateScrollbarInfos = function() {
              if (doScrollLeft)
                refreshScrollbarHandleOffset(true);
              if (doScrollTop)
                refreshScrollbarHandleOffset(false);
            };
            var proxyCompleteCallback = type(completeCallback) != TYPES.f ? undefined2 : function() {
              updateScrollbarInfos();
              completeCallback();
            };
            function checkSettingsStringValue(currValue, allowedValues) {
              for (i2 = 0; i2 < allowedValues[strLength]; i2++) {
                if (currValue === allowedValues[i2])
                  return true;
              }
              return false;
            }
            function getRawScroll(isX, coordinates2) {
              var coordinateProps = isX ? coordinatesXAxisProps : coordinatesYAxisProps;
              coordinates2 = type(coordinates2) == TYPES.s || type(coordinates2) == TYPES.n ? [coordinates2, coordinates2] : coordinates2;
              if (COMPATIBILITY.isA(coordinates2))
                return isX ? coordinates2[0] : coordinates2[1];
              else if (type(coordinates2) == TYPES.o) {
                for (i2 = 0; i2 < coordinateProps[strLength]; i2++)
                  if (coordinateProps[i2] in coordinates2)
                    return coordinates2[coordinateProps[i2]];
              }
            }
            function getFinalScroll(isX, rawScroll) {
              var isString = type(rawScroll) == TYPES.s;
              var operator;
              var amount;
              var scrollInfo = isX ? _scrollHorizontalInfo : _scrollVerticalInfo;
              var currScroll = scrollInfo._currentScroll;
              var maxScroll = scrollInfo._maxScroll;
              var mult = " * ";
              var finalValue;
              var isRTLisX = _isRTL && isX;
              var normalizeShortcuts = isRTLisX && _rtlScrollBehavior.n && !normalizeRTL;
              var strReplace = "replace";
              var evalFunc = eval;
              var possibleOperator;
              if (isString) {
                if (rawScroll[strLength] > 2) {
                  possibleOperator = rawScroll.substr(0, 2);
                  if (inArray(possibleOperator, coordinatesOperators) > -1)
                    operator = possibleOperator;
                }
                rawScroll = operator ? rawScroll.substr(2) : rawScroll;
                rawScroll = rawScroll[strReplace](/min/g, 0)[strReplace](/</g, 0)[strReplace](/max/g, (normalizeShortcuts ? "-" : _strEmpty) + _strHundredPercent)[strReplace](/>/g, (normalizeShortcuts ? "-" : _strEmpty) + _strHundredPercent)[strReplace](/px/g, _strEmpty)[strReplace](/%/g, mult + maxScroll * (isRTLisX && _rtlScrollBehavior.n ? -1 : 1) / 100)[strReplace](/vw/g, mult + _viewportSize.w)[strReplace](/vh/g, mult + _viewportSize.h);
                amount = parseToZeroOrNumber(isNaN(rawScroll) ? parseToZeroOrNumber(evalFunc(rawScroll), true).toFixed() : rawScroll);
              } else {
                amount = rawScroll;
              }
              if (amount !== undefined2 && !isNaN(amount) && type(amount) == TYPES.n) {
                var normalizeIsRTLisX = normalizeRTL && isRTLisX;
                var operatorCurrScroll = currScroll * (normalizeIsRTLisX && _rtlScrollBehavior.n ? -1 : 1);
                var invert = normalizeIsRTLisX && _rtlScrollBehavior.i;
                var negate = normalizeIsRTLisX && _rtlScrollBehavior.n;
                operatorCurrScroll = invert ? maxScroll - operatorCurrScroll : operatorCurrScroll;
                switch (operator) {
                  case "+=":
                    finalValue = operatorCurrScroll + amount;
                    break;
                  case "-=":
                    finalValue = operatorCurrScroll - amount;
                    break;
                  case "*=":
                    finalValue = operatorCurrScroll * amount;
                    break;
                  case "/=":
                    finalValue = operatorCurrScroll / amount;
                    break;
                  default:
                    finalValue = amount;
                    break;
                }
                finalValue = invert ? maxScroll - finalValue : finalValue;
                finalValue *= negate ? -1 : 1;
                finalValue = isRTLisX && _rtlScrollBehavior.n ? MATH.min(0, MATH.max(maxScroll, finalValue)) : MATH.max(0, MATH.min(maxScroll, finalValue));
              }
              return finalValue === currScroll ? undefined2 : finalValue;
            }
            function getPerAxisValue(value, valueInternalType, defaultValue, allowedValues) {
              var resultDefault = [defaultValue, defaultValue];
              var valueType = type(value);
              var valueArrLength;
              var valueArrItem;
              if (valueType == valueInternalType) {
                value = [value, value];
              } else if (valueType == TYPES.a) {
                valueArrLength = value[strLength];
                if (valueArrLength > 2 || valueArrLength < 1)
                  value = resultDefault;
                else {
                  if (valueArrLength === 1)
                    value[1] = defaultValue;
                  for (i2 = 0; i2 < valueArrLength; i2++) {
                    valueArrItem = value[i2];
                    if (type(valueArrItem) != valueInternalType || !checkSettingsStringValue(valueArrItem, allowedValues)) {
                      value = resultDefault;
                      break;
                    }
                  }
                }
              } else if (valueType == TYPES.o)
                value = [value[_strX] || defaultValue, value[_strY] || defaultValue];
              else
                value = resultDefault;
              return { x: value[0], y: value[1] };
            }
            function generateMargin(marginTopRightBottomLeftArray) {
              var result = [];
              var currValue;
              var currValueType;
              var valueDirections = [_strTop, _strRight, _strBottom, _strLeft];
              for (i2 = 0; i2 < marginTopRightBottomLeftArray[strLength]; i2++) {
                if (i2 === valueDirections[strLength])
                  break;
                currValue = marginTopRightBottomLeftArray[i2];
                currValueType = type(currValue);
                if (currValueType == TYPES.b)
                  result.push(currValue ? parseToZeroOrNumber(finalElement.css(_strMarginMinus + valueDirections[i2])) : 0);
                else
                  result.push(currValueType == TYPES.n ? currValue : 0);
              }
              return result;
            }
            if (possibleElementIsJQuery || possibleElementIsHTMLElement) {
              var margin = coordinatesIsElementObj ? coordinates.margin : 0;
              var axis = coordinatesIsElementObj ? coordinates.axis : 0;
              var scroll = coordinatesIsElementObj ? coordinates.scroll : 0;
              var block = coordinatesIsElementObj ? coordinates.block : 0;
              var marginDefault = [0, 0, 0, 0];
              var marginType = type(margin);
              var marginLength;
              finalElement = possibleElementIsJQuery ? possibleElement : FRAMEWORK(possibleElement);
              if (finalElement[strLength] > 0) {
                if (marginType == TYPES.n || marginType == TYPES.b)
                  margin = generateMargin([margin, margin, margin, margin]);
                else if (marginType == TYPES.a) {
                  marginLength = margin[strLength];
                  if (marginLength === 2)
                    margin = generateMargin([margin[0], margin[1], margin[0], margin[1]]);
                  else if (marginLength >= 4)
                    margin = generateMargin(margin);
                  else
                    margin = marginDefault;
                } else if (marginType == TYPES.o)
                  margin = generateMargin([margin[_strTop], margin[_strRight], margin[_strBottom], margin[_strLeft]]);
                else
                  margin = marginDefault;
                settingsAxis = checkSettingsStringValue(axis, elementObjSettingsAxisValues) ? axis : "xy";
                settingsScroll = getPerAxisValue(scroll, TYPES.s, strAlways, elementObjSettingsScrollValues);
                settingsBlock = getPerAxisValue(block, TYPES.s, strBegin, elementObjSettingsBlockValues);
                settingsMargin = margin;
                var viewportScroll = {
                  l: _scrollHorizontalInfo._currentScroll,
                  t: _scrollVerticalInfo._currentScroll
                };
                var viewportOffset = _paddingElement.offset();
                var elementOffset = finalElement.offset();
                var doNotScroll = {
                  x: settingsScroll.x == strNever || settingsAxis == _strY,
                  y: settingsScroll.y == strNever || settingsAxis == _strX
                };
                elementOffset[_strTop] -= settingsMargin[0];
                elementOffset[_strLeft] -= settingsMargin[3];
                var elementScrollCoordinates = {
                  x: MATH.round(elementOffset[_strLeft] - viewportOffset[_strLeft] + viewportScroll.l),
                  y: MATH.round(elementOffset[_strTop] - viewportOffset[_strTop] + viewportScroll.t)
                };
                if (_isRTL) {
                  if (!_rtlScrollBehavior.n && !_rtlScrollBehavior.i)
                    elementScrollCoordinates.x = MATH.round(viewportOffset[_strLeft] - elementOffset[_strLeft] + viewportScroll.l);
                  if (_rtlScrollBehavior.n && normalizeRTL)
                    elementScrollCoordinates.x *= -1;
                  if (_rtlScrollBehavior.i && normalizeRTL)
                    elementScrollCoordinates.x = MATH.round(viewportOffset[_strLeft] - elementOffset[_strLeft] + (_scrollHorizontalInfo._maxScroll - viewportScroll.l));
                }
                if (settingsBlock.x != strBegin || settingsBlock.y != strBegin || settingsScroll.x == strIfNeeded || settingsScroll.y == strIfNeeded || _isRTL) {
                  var measuringElm = finalElement[0];
                  var rawElementSize = _supportTransform ? measuringElm[LEXICON.bCR]() : {
                    width: measuringElm[LEXICON.oW],
                    height: measuringElm[LEXICON.oH]
                  };
                  var elementSize = {
                    w: rawElementSize[_strWidth] + settingsMargin[3] + settingsMargin[1],
                    h: rawElementSize[_strHeight] + settingsMargin[0] + settingsMargin[2]
                  };
                  var finalizeBlock = function(isX) {
                    var vars = getScrollbarVars(isX);
                    var wh = vars._w_h;
                    var lt = vars._left_top;
                    var xy = vars._x_y;
                    var blockIsEnd = settingsBlock[xy] == (isX ? _isRTL ? strBegin : strEnd : strEnd);
                    var blockIsCenter = settingsBlock[xy] == strCenter;
                    var blockIsNearest = settingsBlock[xy] == strNearest;
                    var scrollNever = settingsScroll[xy] == strNever;
                    var scrollIfNeeded = settingsScroll[xy] == strIfNeeded;
                    var vpSize = _viewportSize[wh];
                    var vpOffset = viewportOffset[lt];
                    var elSize = elementSize[wh];
                    var elOffset = elementOffset[lt];
                    var divide = blockIsCenter ? 2 : 1;
                    var elementCenterOffset = elOffset + elSize / 2;
                    var viewportCenterOffset = vpOffset + vpSize / 2;
                    var isInView = elSize <= vpSize && elOffset >= vpOffset && elOffset + elSize <= vpOffset + vpSize;
                    if (scrollNever)
                      doNotScroll[xy] = true;
                    else if (!doNotScroll[xy]) {
                      if (blockIsNearest || scrollIfNeeded) {
                        doNotScroll[xy] = scrollIfNeeded ? isInView : false;
                        blockIsEnd = elSize < vpSize ? elementCenterOffset > viewportCenterOffset : elementCenterOffset < viewportCenterOffset;
                      }
                      elementScrollCoordinates[xy] -= blockIsEnd || blockIsCenter ? (vpSize / divide - elSize / divide) * (isX && _isRTL && normalizeRTL ? -1 : 1) : 0;
                    }
                  };
                  finalizeBlock(true);
                  finalizeBlock(false);
                }
                if (doNotScroll.y)
                  delete elementScrollCoordinates.y;
                if (doNotScroll.x)
                  delete elementScrollCoordinates.x;
                coordinates = elementScrollCoordinates;
              }
            }
            finalScroll[_strScrollLeft] = getFinalScroll(true, getRawScroll(true, coordinates));
            finalScroll[_strScrollTop] = getFinalScroll(false, getRawScroll(false, coordinates));
            doScrollLeft = finalScroll[_strScrollLeft] !== undefined2;
            doScrollTop = finalScroll[_strScrollTop] !== undefined2;
            if ((doScrollLeft || doScrollTop) && (duration > 0 || durationIsObject)) {
              if (durationIsObject) {
                duration.complete = proxyCompleteCallback;
                _viewportElement.animate(finalScroll, duration);
              } else {
                animationOptions = {
                  duration,
                  complete: proxyCompleteCallback
                };
                if (COMPATIBILITY.isA(easing) || FRAMEWORK.isPlainObject(easing)) {
                  specialEasing[_strScrollLeft] = easing[0] || easing.x;
                  specialEasing[_strScrollTop] = easing[1] || easing.y;
                  animationOptions.specialEasing = specialEasing;
                } else {
                  animationOptions.easing = easing;
                }
                _viewportElement.animate(finalScroll, animationOptions);
              }
            } else {
              if (doScrollLeft)
                _viewportElement[_strScrollLeft](finalScroll[_strScrollLeft]);
              if (doScrollTop)
                _viewportElement[_strScrollTop](finalScroll[_strScrollTop]);
              updateScrollbarInfos();
            }
          };
          _base.scrollStop = function(param1, param2, param3) {
            _viewportElement.stop(param1, param2, param3);
            return _base;
          };
          _base.getElements = function(elementName) {
            var obj = {
              target: _targetElementNative,
              host: _hostElementNative,
              padding: _paddingElementNative,
              viewport: _viewportElementNative,
              content: _contentElementNative,
              scrollbarHorizontal: {
                scrollbar: _scrollbarHorizontalElement[0],
                track: _scrollbarHorizontalTrackElement[0],
                handle: _scrollbarHorizontalHandleElement[0]
              },
              scrollbarVertical: {
                scrollbar: _scrollbarVerticalElement[0],
                track: _scrollbarVerticalTrackElement[0],
                handle: _scrollbarVerticalHandleElement[0]
              },
              scrollbarCorner: _scrollbarCornerElement[0]
            };
            return type(elementName) == TYPES.s ? getObjectPropVal(obj, elementName) : obj;
          };
          _base.getState = function(stateProperty) {
            function prepare(obj2) {
              if (!FRAMEWORK.isPlainObject(obj2))
                return obj2;
              var extended = extendDeep({}, obj2);
              var changePropertyName = function(from, to) {
                if (extended[LEXICON.hOP](from)) {
                  extended[to] = extended[from];
                  delete extended[from];
                }
              };
              changePropertyName("w", _strWidth);
              changePropertyName("h", _strHeight);
              delete extended.c;
              return extended;
            }
            ;
            var obj = {
              destroyed: !!prepare(_destroyed),
              sleeping: !!prepare(_sleeping),
              autoUpdate: prepare(!_mutationObserversConnected),
              widthAuto: prepare(_widthAutoCache),
              heightAuto: prepare(_heightAutoCache),
              padding: prepare(_cssPaddingCache),
              overflowAmount: prepare(_overflowAmountCache),
              hideOverflow: prepare(_hideOverflowCache),
              hasOverflow: prepare(_hasOverflowCache),
              contentScrollSize: prepare(_contentScrollSizeCache),
              viewportSize: prepare(_viewportSize),
              hostSize: prepare(_hostSizeCache),
              documentMixed: prepare(_documentMixed)
            };
            return type(stateProperty) == TYPES.s ? getObjectPropVal(obj, stateProperty) : obj;
          };
          _base.ext = function(extName) {
            var result;
            var privateMethods = _extensionsPrivateMethods.split(" ");
            var i2 = 0;
            if (type(extName) == TYPES.s) {
              if (_extensions[LEXICON.hOP](extName)) {
                result = extendDeep({}, _extensions[extName]);
                for (; i2 < privateMethods.length; i2++)
                  delete result[privateMethods[i2]];
              }
            } else {
              result = {};
              for (i2 in _extensions)
                result[i2] = extendDeep({}, _base.ext(i2));
            }
            return result;
          };
          _base.addExt = function(extName, extensionOptions) {
            var registeredExtensionObj = _plugin.extension(extName);
            var instance;
            var instanceAdded;
            var instanceContract;
            var contractResult;
            var contractFulfilled = true;
            if (registeredExtensionObj) {
              if (!_extensions[LEXICON.hOP](extName)) {
                instance = registeredExtensionObj.extensionFactory.call(_base, extendDeep({}, registeredExtensionObj.defaultOptions), FRAMEWORK, COMPATIBILITY);
                if (instance) {
                  instanceContract = instance.contract;
                  if (type(instanceContract) == TYPES.f) {
                    contractResult = instanceContract(window2);
                    contractFulfilled = type(contractResult) == TYPES.b ? contractResult : contractFulfilled;
                  }
                  if (contractFulfilled) {
                    _extensions[extName] = instance;
                    instanceAdded = instance.added;
                    if (type(instanceAdded) == TYPES.f)
                      instanceAdded(extensionOptions);
                    return _base.ext(extName);
                  }
                }
              } else
                return _base.ext(extName);
            } else
              console.warn('A extension with the name "' + extName + `" isn't registered.`);
          };
          _base.removeExt = function(extName) {
            var instance = _extensions[extName];
            var instanceRemoved;
            if (instance) {
              delete _extensions[extName];
              instanceRemoved = instance.removed;
              if (type(instanceRemoved) == TYPES.f)
                instanceRemoved();
              return true;
            }
            return false;
          };
          function construct(targetElement, options2, extensions2) {
            _defaultOptions = globals.defaultOptions;
            _nativeScrollbarStyling = globals.nativeScrollbarStyling;
            _nativeScrollbarSize = extendDeep({}, globals.nativeScrollbarSize);
            _nativeScrollbarIsOverlaid = extendDeep({}, globals.nativeScrollbarIsOverlaid);
            _overlayScrollbarDummySize = extendDeep({}, globals.overlayScrollbarDummySize);
            _rtlScrollBehavior = extendDeep({}, globals.rtlScrollBehavior);
            setOptions(extendDeep({}, _defaultOptions, options2));
            _cssCalc = globals.cssCalc;
            _msieVersion = globals.msie;
            _autoUpdateRecommended = globals.autoUpdateRecommended;
            _supportTransition = globals.supportTransition;
            _supportTransform = globals.supportTransform;
            _supportPassiveEvents = globals.supportPassiveEvents;
            _supportResizeObserver = globals.supportResizeObserver;
            _supportMutationObserver = globals.supportMutationObserver;
            _restrictedMeasuring = globals.restrictedMeasuring;
            _documentElement = FRAMEWORK(targetElement.ownerDocument);
            _documentElementNative = _documentElement[0];
            _windowElement = FRAMEWORK(_documentElementNative.defaultView || _documentElementNative.parentWindow);
            _windowElementNative = _windowElement[0];
            _htmlElement = findFirst(_documentElement, "html");
            _bodyElement = findFirst(_htmlElement, "body");
            _targetElement = FRAMEWORK(targetElement);
            _targetElementNative = _targetElement[0];
            _isTextarea = _targetElement.is("textarea");
            _isBody = _targetElement.is("body");
            _documentMixed = _documentElementNative !== document2;
            _domExists = _isTextarea ? _targetElement.hasClass(_classNameTextareaElement) && _targetElement.parent().hasClass(_classNameContentElement) : _targetElement.hasClass(_classNameHostElement) && _targetElement.children(_strDot + _classNamePaddingElement)[LEXICON.l];
            var initBodyScroll;
            var bodyMouseTouchDownListener;
            if (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y && !_currentPreparedOptions.nativeScrollbarsOverlaid.initialize) {
              dispatchCallback("onInitializationWithdrawn");
              if (_domExists) {
                setupStructureDOM(true);
                setupScrollbarsDOM(true);
                setupScrollbarCornerDOM(true);
              }
              _destroyed = true;
              _sleeping = true;
              return _base;
            }
            if (_isBody) {
              initBodyScroll = {};
              initBodyScroll.l = MATH.max(_targetElement[_strScrollLeft](), _htmlElement[_strScrollLeft](), _windowElement[_strScrollLeft]());
              initBodyScroll.t = MATH.max(_targetElement[_strScrollTop](), _htmlElement[_strScrollTop](), _windowElement[_strScrollTop]());
              bodyMouseTouchDownListener = function() {
                _viewportElement.removeAttr(LEXICON.ti);
                setupResponsiveEventListener(_viewportElement, _strMouseTouchDownEvent, bodyMouseTouchDownListener, true, true);
              };
            }
            setupStructureDOM();
            setupScrollbarsDOM();
            setupScrollbarCornerDOM();
            setupStructureEvents();
            setupScrollbarEvents(true);
            setupScrollbarEvents(false);
            setupScrollbarCornerEvents();
            createMutationObservers();
            setupResizeObserver(_sizeObserverElement, hostOnResized);
            if (_isBody) {
              _viewportElement[_strScrollLeft](initBodyScroll.l)[_strScrollTop](initBodyScroll.t);
              if (document2.activeElement == targetElement && _viewportElementNative.focus) {
                _viewportElement.attr(LEXICON.ti, "-1");
                _viewportElementNative.focus();
                setupResponsiveEventListener(_viewportElement, _strMouseTouchDownEvent, bodyMouseTouchDownListener, false, true);
              }
            }
            _base.update(_strAuto);
            _initialized = true;
            dispatchCallback("onInitialized");
            each2(_callbacksInitQeueue, function(index, value) {
              dispatchCallback(value.n, value.a);
            });
            _callbacksInitQeueue = [];
            if (type(extensions2) == TYPES.s)
              extensions2 = [extensions2];
            if (COMPATIBILITY.isA(extensions2))
              each2(extensions2, function(index, value) {
                _base.addExt(value);
              });
            else if (FRAMEWORK.isPlainObject(extensions2))
              each2(extensions2, function(key2, value) {
                _base.addExt(key2, value);
              });
            setTimeout(function() {
              if (_supportTransition && !_destroyed)
                addClass(_hostElement, _classNameHostTransition);
            }, 333);
            return _base;
          }
          if (_plugin.valid(construct(pluginTargetElement, options, extensions))) {
            INSTANCES(pluginTargetElement, _base);
          }
          return _base;
        }
        _plugin = window2[PLUGINNAME] = function(pluginTargetElements, options, extensions) {
          if (arguments[LEXICON.l] === 0)
            return this;
          var arr = [];
          var optsIsPlainObj = FRAMEWORK.isPlainObject(options);
          var inst;
          var result;
          if (!pluginTargetElements)
            return optsIsPlainObj || !options ? result : arr;
          pluginTargetElements = pluginTargetElements[LEXICON.l] != undefined2 ? pluginTargetElements : [pluginTargetElements[0] || pluginTargetElements];
          initOverlayScrollbarsStatics();
          if (pluginTargetElements[LEXICON.l] > 0) {
            if (optsIsPlainObj) {
              FRAMEWORK.each(pluginTargetElements, function(i2, v) {
                inst = v;
                if (inst !== undefined2)
                  arr.push(OverlayScrollbarsInstance(inst, options, extensions, _pluginsGlobals, _pluginsAutoUpdateLoop));
              });
            } else {
              FRAMEWORK.each(pluginTargetElements, function(i2, v) {
                inst = INSTANCES(v);
                if (options === "!" && _plugin.valid(inst) || COMPATIBILITY.type(options) == TYPES.f && options(v, inst))
                  arr.push(inst);
                else if (options === undefined2)
                  arr.push(inst);
              });
            }
            result = arr[LEXICON.l] === 1 ? arr[0] : arr;
          }
          return result;
        };
        _plugin.globals = function() {
          initOverlayScrollbarsStatics();
          var globals = FRAMEWORK.extend(true, {}, _pluginsGlobals);
          delete globals["msie"];
          return globals;
        };
        _plugin.defaultOptions = function(newDefaultOptions) {
          initOverlayScrollbarsStatics();
          var currDefaultOptions = _pluginsGlobals.defaultOptions;
          if (newDefaultOptions === undefined2)
            return FRAMEWORK.extend(true, {}, currDefaultOptions);
          _pluginsGlobals.defaultOptions = FRAMEWORK.extend(true, {}, currDefaultOptions, _pluginsOptions._validate(newDefaultOptions, _pluginsOptions._template, true, currDefaultOptions)._default);
        };
        _plugin.valid = function(osInstance) {
          return osInstance instanceof _plugin && !osInstance.getState().destroyed;
        };
        _plugin.extension = function(extensionName, extension, defaultOptions) {
          var extNameTypeString = COMPATIBILITY.type(extensionName) == TYPES.s;
          var argLen = arguments[LEXICON.l];
          var i2 = 0;
          if (argLen < 1 || !extNameTypeString) {
            return FRAMEWORK.extend(true, { length: _pluginsExtensions[LEXICON.l] }, _pluginsExtensions);
          } else if (extNameTypeString) {
            if (COMPATIBILITY.type(extension) == TYPES.f) {
              _pluginsExtensions.push({
                name: extensionName,
                extensionFactory: extension,
                defaultOptions
              });
            } else {
              for (; i2 < _pluginsExtensions[LEXICON.l]; i2++) {
                if (_pluginsExtensions[i2].name === extensionName) {
                  if (argLen > 1)
                    _pluginsExtensions.splice(i2, 1);
                  else
                    return FRAMEWORK.extend(true, {}, _pluginsExtensions[i2]);
                }
              }
            }
          }
        };
        return _plugin;
      }();
      if (JQUERY && JQUERY.fn) {
        JQUERY.fn.overlayScrollbars = function(options, extensions) {
          var _elements = this;
          if (JQUERY.isPlainObject(options)) {
            JQUERY.each(_elements, function() {
              PLUGIN(this, options, extensions);
            });
            return _elements;
          } else
            return PLUGIN(_elements, options);
        };
      }
      return PLUGIN;
    });
  }
});

// node_modules/howler/dist/howler.js
var require_howler = __commonJS({
  "node_modules/howler/dist/howler.js"(exports) {
    (function() {
      "use strict";
      var HowlerGlobal2 = function() {
        this.init();
      };
      HowlerGlobal2.prototype = {
        init: function() {
          var self2 = this || Howler2;
          self2._counter = 1e3;
          self2._html5AudioPool = [];
          self2.html5PoolSize = 10;
          self2._codecs = {};
          self2._howls = [];
          self2._muted = false;
          self2._volume = 1;
          self2._canPlayEvent = "canplaythrough";
          self2._navigator = typeof window !== "undefined" && window.navigator ? window.navigator : null;
          self2.masterGain = null;
          self2.noAudio = false;
          self2.usingWebAudio = true;
          self2.autoSuspend = true;
          self2.ctx = null;
          self2.autoUnlock = true;
          self2._setup();
          return self2;
        },
        volume: function(vol) {
          var self2 = this || Howler2;
          vol = parseFloat(vol);
          if (!self2.ctx) {
            setupAudioContext();
          }
          if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
            self2._volume = vol;
            if (self2._muted) {
              return self2;
            }
            if (self2.usingWebAudio) {
              self2.masterGain.gain.setValueAtTime(vol, Howler2.ctx.currentTime);
            }
            for (var i2 = 0; i2 < self2._howls.length; i2++) {
              if (!self2._howls[i2]._webAudio) {
                var ids = self2._howls[i2]._getSoundIds();
                for (var j = 0; j < ids.length; j++) {
                  var sound = self2._howls[i2]._soundById(ids[j]);
                  if (sound && sound._node) {
                    sound._node.volume = sound._volume * vol;
                  }
                }
              }
            }
            return self2;
          }
          return self2._volume;
        },
        mute: function(muted2) {
          var self2 = this || Howler2;
          if (!self2.ctx) {
            setupAudioContext();
          }
          self2._muted = muted2;
          if (self2.usingWebAudio) {
            self2.masterGain.gain.setValueAtTime(muted2 ? 0 : self2._volume, Howler2.ctx.currentTime);
          }
          for (var i2 = 0; i2 < self2._howls.length; i2++) {
            if (!self2._howls[i2]._webAudio) {
              var ids = self2._howls[i2]._getSoundIds();
              for (var j = 0; j < ids.length; j++) {
                var sound = self2._howls[i2]._soundById(ids[j]);
                if (sound && sound._node) {
                  sound._node.muted = muted2 ? true : sound._muted;
                }
              }
            }
          }
          return self2;
        },
        stop: function() {
          var self2 = this || Howler2;
          for (var i2 = 0; i2 < self2._howls.length; i2++) {
            self2._howls[i2].stop();
          }
          return self2;
        },
        unload: function() {
          var self2 = this || Howler2;
          for (var i2 = self2._howls.length - 1; i2 >= 0; i2--) {
            self2._howls[i2].unload();
          }
          if (self2.usingWebAudio && self2.ctx && typeof self2.ctx.close !== "undefined") {
            self2.ctx.close();
            self2.ctx = null;
            setupAudioContext();
          }
          return self2;
        },
        codecs: function(ext) {
          return (this || Howler2)._codecs[ext.replace(/^x-/, "")];
        },
        _setup: function() {
          var self2 = this || Howler2;
          self2.state = self2.ctx ? self2.ctx.state || "suspended" : "suspended";
          self2._autoSuspend();
          if (!self2.usingWebAudio) {
            if (typeof Audio !== "undefined") {
              try {
                var test = new Audio();
                if (typeof test.oncanplaythrough === "undefined") {
                  self2._canPlayEvent = "canplay";
                }
              } catch (e2) {
                self2.noAudio = true;
              }
            } else {
              self2.noAudio = true;
            }
          }
          try {
            var test = new Audio();
            if (test.muted) {
              self2.noAudio = true;
            }
          } catch (e2) {
          }
          if (!self2.noAudio) {
            self2._setupCodecs();
          }
          return self2;
        },
        _setupCodecs: function() {
          var self2 = this || Howler2;
          var audioTest = null;
          try {
            audioTest = typeof Audio !== "undefined" ? new Audio() : null;
          } catch (err) {
            return self2;
          }
          if (!audioTest || typeof audioTest.canPlayType !== "function") {
            return self2;
          }
          var mpegTest = audioTest.canPlayType("audio/mpeg;").replace(/^no$/, "");
          var ua = self2._navigator ? self2._navigator.userAgent : "";
          var checkOpera = ua.match(/OPR\/([0-6].)/g);
          var isOldOpera = checkOpera && parseInt(checkOpera[0].split("/")[1], 10) < 33;
          var checkSafari = ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1;
          var safariVersion = ua.match(/Version\/(.*?) /);
          var isOldSafari = checkSafari && safariVersion && parseInt(safariVersion[1], 10) < 15;
          self2._codecs = {
            mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType("audio/mp3;").replace(/^no$/, ""))),
            mpeg: !!mpegTest,
            opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
            ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            wav: !!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType("audio/wav")).replace(/^no$/, ""),
            aac: !!audioTest.canPlayType("audio/aac;").replace(/^no$/, ""),
            caf: !!audioTest.canPlayType("audio/x-caf;").replace(/^no$/, ""),
            m4a: !!(audioTest.canPlayType("audio/x-m4a;") || audioTest.canPlayType("audio/m4a;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
            m4b: !!(audioTest.canPlayType("audio/x-m4b;") || audioTest.canPlayType("audio/m4b;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
            mp4: !!(audioTest.canPlayType("audio/x-mp4;") || audioTest.canPlayType("audio/mp4;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
            weba: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
            webm: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
            dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
            flac: !!(audioTest.canPlayType("audio/x-flac;") || audioTest.canPlayType("audio/flac;")).replace(/^no$/, "")
          };
          return self2;
        },
        _unlockAudio: function() {
          var self2 = this || Howler2;
          if (self2._audioUnlocked || !self2.ctx) {
            return;
          }
          self2._audioUnlocked = false;
          self2.autoUnlock = false;
          if (!self2._mobileUnloaded && self2.ctx.sampleRate !== 44100) {
            self2._mobileUnloaded = true;
            self2.unload();
          }
          self2._scratchBuffer = self2.ctx.createBuffer(1, 1, 22050);
          var unlock = function(e2) {
            while (self2._html5AudioPool.length < self2.html5PoolSize) {
              try {
                var audioNode = new Audio();
                audioNode._unlocked = true;
                self2._releaseHtml5Audio(audioNode);
              } catch (e3) {
                self2.noAudio = true;
                break;
              }
            }
            for (var i2 = 0; i2 < self2._howls.length; i2++) {
              if (!self2._howls[i2]._webAudio) {
                var ids = self2._howls[i2]._getSoundIds();
                for (var j = 0; j < ids.length; j++) {
                  var sound = self2._howls[i2]._soundById(ids[j]);
                  if (sound && sound._node && !sound._node._unlocked) {
                    sound._node._unlocked = true;
                    sound._node.load();
                  }
                }
              }
            }
            self2._autoResume();
            var source = self2.ctx.createBufferSource();
            source.buffer = self2._scratchBuffer;
            source.connect(self2.ctx.destination);
            if (typeof source.start === "undefined") {
              source.noteOn(0);
            } else {
              source.start(0);
            }
            if (typeof self2.ctx.resume === "function") {
              self2.ctx.resume();
            }
            source.onended = function() {
              source.disconnect(0);
              self2._audioUnlocked = true;
              document.removeEventListener("touchstart", unlock, true);
              document.removeEventListener("touchend", unlock, true);
              document.removeEventListener("click", unlock, true);
              document.removeEventListener("keydown", unlock, true);
              for (var i3 = 0; i3 < self2._howls.length; i3++) {
                self2._howls[i3]._emit("unlock");
              }
            };
          };
          document.addEventListener("touchstart", unlock, true);
          document.addEventListener("touchend", unlock, true);
          document.addEventListener("click", unlock, true);
          document.addEventListener("keydown", unlock, true);
          return self2;
        },
        _obtainHtml5Audio: function() {
          var self2 = this || Howler2;
          if (self2._html5AudioPool.length) {
            return self2._html5AudioPool.pop();
          }
          var testPlay = new Audio().play();
          if (testPlay && typeof Promise !== "undefined" && (testPlay instanceof Promise || typeof testPlay.then === "function")) {
            testPlay.catch(function() {
              console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
            });
          }
          return new Audio();
        },
        _releaseHtml5Audio: function(audio) {
          var self2 = this || Howler2;
          if (audio._unlocked) {
            self2._html5AudioPool.push(audio);
          }
          return self2;
        },
        _autoSuspend: function() {
          var self2 = this;
          if (!self2.autoSuspend || !self2.ctx || typeof self2.ctx.suspend === "undefined" || !Howler2.usingWebAudio) {
            return;
          }
          for (var i2 = 0; i2 < self2._howls.length; i2++) {
            if (self2._howls[i2]._webAudio) {
              for (var j = 0; j < self2._howls[i2]._sounds.length; j++) {
                if (!self2._howls[i2]._sounds[j]._paused) {
                  return self2;
                }
              }
            }
          }
          if (self2._suspendTimer) {
            clearTimeout(self2._suspendTimer);
          }
          self2._suspendTimer = setTimeout(function() {
            if (!self2.autoSuspend) {
              return;
            }
            self2._suspendTimer = null;
            self2.state = "suspending";
            var handleSuspension = function() {
              self2.state = "suspended";
              if (self2._resumeAfterSuspend) {
                delete self2._resumeAfterSuspend;
                self2._autoResume();
              }
            };
            self2.ctx.suspend().then(handleSuspension, handleSuspension);
          }, 3e4);
          return self2;
        },
        _autoResume: function() {
          var self2 = this;
          if (!self2.ctx || typeof self2.ctx.resume === "undefined" || !Howler2.usingWebAudio) {
            return;
          }
          if (self2.state === "running" && self2.ctx.state !== "interrupted" && self2._suspendTimer) {
            clearTimeout(self2._suspendTimer);
            self2._suspendTimer = null;
          } else if (self2.state === "suspended" || self2.state === "running" && self2.ctx.state === "interrupted") {
            self2.ctx.resume().then(function() {
              self2.state = "running";
              for (var i2 = 0; i2 < self2._howls.length; i2++) {
                self2._howls[i2]._emit("resume");
              }
            });
            if (self2._suspendTimer) {
              clearTimeout(self2._suspendTimer);
              self2._suspendTimer = null;
            }
          } else if (self2.state === "suspending") {
            self2._resumeAfterSuspend = true;
          }
          return self2;
        }
      };
      var Howler2 = new HowlerGlobal2();
      var Howl2 = function(o) {
        var self2 = this;
        if (!o.src || o.src.length === 0) {
          console.error("An array of source files must be passed with any new Howl.");
          return;
        }
        self2.init(o);
      };
      Howl2.prototype = {
        init: function(o) {
          var self2 = this;
          if (!Howler2.ctx) {
            setupAudioContext();
          }
          self2._autoplay = o.autoplay || false;
          self2._format = typeof o.format !== "string" ? o.format : [o.format];
          self2._html5 = o.html5 || false;
          self2._muted = o.mute || false;
          self2._loop = o.loop || false;
          self2._pool = o.pool || 5;
          self2._preload = typeof o.preload === "boolean" || o.preload === "metadata" ? o.preload : true;
          self2._rate = o.rate || 1;
          self2._sprite = o.sprite || {};
          self2._src = typeof o.src !== "string" ? o.src : [o.src];
          self2._volume = o.volume !== void 0 ? o.volume : 1;
          self2._xhr = {
            method: o.xhr && o.xhr.method ? o.xhr.method : "GET",
            headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
            withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : false
          };
          self2._duration = 0;
          self2._state = "unloaded";
          self2._sounds = [];
          self2._endTimers = {};
          self2._queue = [];
          self2._playLock = false;
          self2._onend = o.onend ? [{ fn: o.onend }] : [];
          self2._onfade = o.onfade ? [{ fn: o.onfade }] : [];
          self2._onload = o.onload ? [{ fn: o.onload }] : [];
          self2._onloaderror = o.onloaderror ? [{ fn: o.onloaderror }] : [];
          self2._onplayerror = o.onplayerror ? [{ fn: o.onplayerror }] : [];
          self2._onpause = o.onpause ? [{ fn: o.onpause }] : [];
          self2._onplay = o.onplay ? [{ fn: o.onplay }] : [];
          self2._onstop = o.onstop ? [{ fn: o.onstop }] : [];
          self2._onmute = o.onmute ? [{ fn: o.onmute }] : [];
          self2._onvolume = o.onvolume ? [{ fn: o.onvolume }] : [];
          self2._onrate = o.onrate ? [{ fn: o.onrate }] : [];
          self2._onseek = o.onseek ? [{ fn: o.onseek }] : [];
          self2._onunlock = o.onunlock ? [{ fn: o.onunlock }] : [];
          self2._onresume = [];
          self2._webAudio = Howler2.usingWebAudio && !self2._html5;
          if (typeof Howler2.ctx !== "undefined" && Howler2.ctx && Howler2.autoUnlock) {
            Howler2._unlockAudio();
          }
          Howler2._howls.push(self2);
          if (self2._autoplay) {
            self2._queue.push({
              event: "play",
              action: function() {
                self2.play();
              }
            });
          }
          if (self2._preload && self2._preload !== "none") {
            self2.load();
          }
          return self2;
        },
        load: function() {
          var self2 = this;
          var url = null;
          if (Howler2.noAudio) {
            self2._emit("loaderror", null, "No audio support.");
            return;
          }
          if (typeof self2._src === "string") {
            self2._src = [self2._src];
          }
          for (var i2 = 0; i2 < self2._src.length; i2++) {
            var ext, str;
            if (self2._format && self2._format[i2]) {
              ext = self2._format[i2];
            } else {
              str = self2._src[i2];
              if (typeof str !== "string") {
                self2._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                continue;
              }
              ext = /^data:audio\/([^;,]+);/i.exec(str);
              if (!ext) {
                ext = /\.([^.]+)$/.exec(str.split("?", 1)[0]);
              }
              if (ext) {
                ext = ext[1].toLowerCase();
              }
            }
            if (!ext) {
              console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
            }
            if (ext && Howler2.codecs(ext)) {
              url = self2._src[i2];
              break;
            }
          }
          if (!url) {
            self2._emit("loaderror", null, "No codec support for selected audio sources.");
            return;
          }
          self2._src = url;
          self2._state = "loading";
          if (window.location.protocol === "https:" && url.slice(0, 5) === "http:") {
            self2._html5 = true;
            self2._webAudio = false;
          }
          new Sound2(self2);
          if (self2._webAudio) {
            loadBuffer(self2);
          }
          return self2;
        },
        play: function(sprite, internal) {
          var self2 = this;
          var id = null;
          if (typeof sprite === "number") {
            id = sprite;
            sprite = null;
          } else if (typeof sprite === "string" && self2._state === "loaded" && !self2._sprite[sprite]) {
            return null;
          } else if (typeof sprite === "undefined") {
            sprite = "__default";
            if (!self2._playLock) {
              var num = 0;
              for (var i2 = 0; i2 < self2._sounds.length; i2++) {
                if (self2._sounds[i2]._paused && !self2._sounds[i2]._ended) {
                  num++;
                  id = self2._sounds[i2]._id;
                }
              }
              if (num === 1) {
                sprite = null;
              } else {
                id = null;
              }
            }
          }
          var sound = id ? self2._soundById(id) : self2._inactiveSound();
          if (!sound) {
            return null;
          }
          if (id && !sprite) {
            sprite = sound._sprite || "__default";
          }
          if (self2._state !== "loaded") {
            sound._sprite = sprite;
            sound._ended = false;
            var soundId = sound._id;
            self2._queue.push({
              event: "play",
              action: function() {
                self2.play(soundId);
              }
            });
            return soundId;
          }
          if (id && !sound._paused) {
            if (!internal) {
              self2._loadQueue("play");
            }
            return sound._id;
          }
          if (self2._webAudio) {
            Howler2._autoResume();
          }
          var seek = Math.max(0, sound._seek > 0 ? sound._seek : self2._sprite[sprite][0] / 1e3);
          var duration = Math.max(0, (self2._sprite[sprite][0] + self2._sprite[sprite][1]) / 1e3 - seek);
          var timeout = duration * 1e3 / Math.abs(sound._rate);
          var start = self2._sprite[sprite][0] / 1e3;
          var stop = (self2._sprite[sprite][0] + self2._sprite[sprite][1]) / 1e3;
          sound._sprite = sprite;
          sound._ended = false;
          var setParams = function() {
            sound._paused = false;
            sound._seek = seek;
            sound._start = start;
            sound._stop = stop;
            sound._loop = !!(sound._loop || self2._sprite[sprite][2]);
          };
          if (seek >= stop) {
            self2._ended(sound);
            return;
          }
          var node = sound._node;
          if (self2._webAudio) {
            var playWebAudio = function() {
              self2._playLock = false;
              setParams();
              self2._refreshBuffer(sound);
              var vol = sound._muted || self2._muted ? 0 : sound._volume;
              node.gain.setValueAtTime(vol, Howler2.ctx.currentTime);
              sound._playStart = Howler2.ctx.currentTime;
              if (typeof node.bufferSource.start === "undefined") {
                sound._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
              } else {
                sound._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
              }
              if (timeout !== Infinity) {
                self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout);
              }
              if (!internal) {
                setTimeout(function() {
                  self2._emit("play", sound._id);
                  self2._loadQueue();
                }, 0);
              }
            };
            if (Howler2.state === "running" && Howler2.ctx.state !== "interrupted") {
              playWebAudio();
            } else {
              self2._playLock = true;
              self2.once("resume", playWebAudio);
              self2._clearTimer(sound._id);
            }
          } else {
            var playHtml5 = function() {
              node.currentTime = seek;
              node.muted = sound._muted || self2._muted || Howler2._muted || node.muted;
              node.volume = sound._volume * Howler2.volume();
              node.playbackRate = sound._rate;
              try {
                var play = node.play();
                if (play && typeof Promise !== "undefined" && (play instanceof Promise || typeof play.then === "function")) {
                  self2._playLock = true;
                  setParams();
                  play.then(function() {
                    self2._playLock = false;
                    node._unlocked = true;
                    if (!internal) {
                      self2._emit("play", sound._id);
                    } else {
                      self2._loadQueue();
                    }
                  }).catch(function() {
                    self2._playLock = false;
                    self2._emit("playerror", sound._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                    sound._ended = true;
                    sound._paused = true;
                  });
                } else if (!internal) {
                  self2._playLock = false;
                  setParams();
                  self2._emit("play", sound._id);
                }
                node.playbackRate = sound._rate;
                if (node.paused) {
                  self2._emit("playerror", sound._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                  return;
                }
                if (sprite !== "__default" || sound._loop) {
                  self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout);
                } else {
                  self2._endTimers[sound._id] = function() {
                    self2._ended(sound);
                    node.removeEventListener("ended", self2._endTimers[sound._id], false);
                  };
                  node.addEventListener("ended", self2._endTimers[sound._id], false);
                }
              } catch (err) {
                self2._emit("playerror", sound._id, err);
              }
            };
            if (node.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA") {
              node.src = self2._src;
              node.load();
            }
            var loadedNoReadyState = window && window.ejecta || !node.readyState && Howler2._navigator.isCocoonJS;
            if (node.readyState >= 3 || loadedNoReadyState) {
              playHtml5();
            } else {
              self2._playLock = true;
              self2._state = "loading";
              var listener = function() {
                self2._state = "loaded";
                playHtml5();
                node.removeEventListener(Howler2._canPlayEvent, listener, false);
              };
              node.addEventListener(Howler2._canPlayEvent, listener, false);
              self2._clearTimer(sound._id);
            }
          }
          return sound._id;
        },
        pause: function(id) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "pause",
              action: function() {
                self2.pause(id);
              }
            });
            return self2;
          }
          var ids = self2._getSoundIds(id);
          for (var i2 = 0; i2 < ids.length; i2++) {
            self2._clearTimer(ids[i2]);
            var sound = self2._soundById(ids[i2]);
            if (sound && !sound._paused) {
              sound._seek = self2.seek(ids[i2]);
              sound._rateSeek = 0;
              sound._paused = true;
              self2._stopFade(ids[i2]);
              if (sound._node) {
                if (self2._webAudio) {
                  if (!sound._node.bufferSource) {
                    continue;
                  }
                  if (typeof sound._node.bufferSource.stop === "undefined") {
                    sound._node.bufferSource.noteOff(0);
                  } else {
                    sound._node.bufferSource.stop(0);
                  }
                  self2._cleanBuffer(sound._node);
                } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
                  sound._node.pause();
                }
              }
            }
            if (!arguments[1]) {
              self2._emit("pause", sound ? sound._id : null);
            }
          }
          return self2;
        },
        stop: function(id, internal) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "stop",
              action: function() {
                self2.stop(id);
              }
            });
            return self2;
          }
          var ids = self2._getSoundIds(id);
          for (var i2 = 0; i2 < ids.length; i2++) {
            self2._clearTimer(ids[i2]);
            var sound = self2._soundById(ids[i2]);
            if (sound) {
              sound._seek = sound._start || 0;
              sound._rateSeek = 0;
              sound._paused = true;
              sound._ended = true;
              self2._stopFade(ids[i2]);
              if (sound._node) {
                if (self2._webAudio) {
                  if (sound._node.bufferSource) {
                    if (typeof sound._node.bufferSource.stop === "undefined") {
                      sound._node.bufferSource.noteOff(0);
                    } else {
                      sound._node.bufferSource.stop(0);
                    }
                    self2._cleanBuffer(sound._node);
                  }
                } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
                  sound._node.currentTime = sound._start || 0;
                  sound._node.pause();
                  if (sound._node.duration === Infinity) {
                    self2._clearSound(sound._node);
                  }
                }
              }
              if (!internal) {
                self2._emit("stop", sound._id);
              }
            }
          }
          return self2;
        },
        mute: function(muted2, id) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "mute",
              action: function() {
                self2.mute(muted2, id);
              }
            });
            return self2;
          }
          if (typeof id === "undefined") {
            if (typeof muted2 === "boolean") {
              self2._muted = muted2;
            } else {
              return self2._muted;
            }
          }
          var ids = self2._getSoundIds(id);
          for (var i2 = 0; i2 < ids.length; i2++) {
            var sound = self2._soundById(ids[i2]);
            if (sound) {
              sound._muted = muted2;
              if (sound._interval) {
                self2._stopFade(sound._id);
              }
              if (self2._webAudio && sound._node) {
                sound._node.gain.setValueAtTime(muted2 ? 0 : sound._volume, Howler2.ctx.currentTime);
              } else if (sound._node) {
                sound._node.muted = Howler2._muted ? true : muted2;
              }
              self2._emit("mute", sound._id);
            }
          }
          return self2;
        },
        volume: function() {
          var self2 = this;
          var args = arguments;
          var vol, id;
          if (args.length === 0) {
            return self2._volume;
          } else if (args.length === 1 || args.length === 2 && typeof args[1] === "undefined") {
            var ids = self2._getSoundIds();
            var index = ids.indexOf(args[0]);
            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else {
              vol = parseFloat(args[0]);
            }
          } else if (args.length >= 2) {
            vol = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          }
          var sound;
          if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "volume",
                action: function() {
                  self2.volume.apply(self2, args);
                }
              });
              return self2;
            }
            if (typeof id === "undefined") {
              self2._volume = vol;
            }
            id = self2._getSoundIds(id);
            for (var i2 = 0; i2 < id.length; i2++) {
              sound = self2._soundById(id[i2]);
              if (sound) {
                sound._volume = vol;
                if (!args[2]) {
                  self2._stopFade(id[i2]);
                }
                if (self2._webAudio && sound._node && !sound._muted) {
                  sound._node.gain.setValueAtTime(vol, Howler2.ctx.currentTime);
                } else if (sound._node && !sound._muted) {
                  sound._node.volume = vol * Howler2.volume();
                }
                self2._emit("volume", sound._id);
              }
            }
          } else {
            sound = id ? self2._soundById(id) : self2._sounds[0];
            return sound ? sound._volume : 0;
          }
          return self2;
        },
        fade: function(from, to, len, id) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "fade",
              action: function() {
                self2.fade(from, to, len, id);
              }
            });
            return self2;
          }
          from = Math.min(Math.max(0, parseFloat(from)), 1);
          to = Math.min(Math.max(0, parseFloat(to)), 1);
          len = parseFloat(len);
          self2.volume(from, id);
          var ids = self2._getSoundIds(id);
          for (var i2 = 0; i2 < ids.length; i2++) {
            var sound = self2._soundById(ids[i2]);
            if (sound) {
              if (!id) {
                self2._stopFade(ids[i2]);
              }
              if (self2._webAudio && !sound._muted) {
                var currentTime = Howler2.ctx.currentTime;
                var end = currentTime + len / 1e3;
                sound._volume = from;
                sound._node.gain.setValueAtTime(from, currentTime);
                sound._node.gain.linearRampToValueAtTime(to, end);
              }
              self2._startFadeInterval(sound, from, to, len, ids[i2], typeof id === "undefined");
            }
          }
          return self2;
        },
        _startFadeInterval: function(sound, from, to, len, id, isGroup) {
          var self2 = this;
          var vol = from;
          var diff = to - from;
          var steps = Math.abs(diff / 0.01);
          var stepLen = Math.max(4, steps > 0 ? len / steps : len);
          var lastTick = Date.now();
          sound._fadeTo = to;
          sound._interval = setInterval(function() {
            var tick = (Date.now() - lastTick) / len;
            lastTick = Date.now();
            vol += diff * tick;
            vol = Math.round(vol * 100) / 100;
            if (diff < 0) {
              vol = Math.max(to, vol);
            } else {
              vol = Math.min(to, vol);
            }
            if (self2._webAudio) {
              sound._volume = vol;
            } else {
              self2.volume(vol, sound._id, true);
            }
            if (isGroup) {
              self2._volume = vol;
            }
            if (to < from && vol <= to || to > from && vol >= to) {
              clearInterval(sound._interval);
              sound._interval = null;
              sound._fadeTo = null;
              self2.volume(to, sound._id);
              self2._emit("fade", sound._id);
            }
          }, stepLen);
        },
        _stopFade: function(id) {
          var self2 = this;
          var sound = self2._soundById(id);
          if (sound && sound._interval) {
            if (self2._webAudio) {
              sound._node.gain.cancelScheduledValues(Howler2.ctx.currentTime);
            }
            clearInterval(sound._interval);
            sound._interval = null;
            self2.volume(sound._fadeTo, id);
            sound._fadeTo = null;
            self2._emit("fade", id);
          }
          return self2;
        },
        loop: function() {
          var self2 = this;
          var args = arguments;
          var loop, id, sound;
          if (args.length === 0) {
            return self2._loop;
          } else if (args.length === 1) {
            if (typeof args[0] === "boolean") {
              loop = args[0];
              self2._loop = loop;
            } else {
              sound = self2._soundById(parseInt(args[0], 10));
              return sound ? sound._loop : false;
            }
          } else if (args.length === 2) {
            loop = args[0];
            id = parseInt(args[1], 10);
          }
          var ids = self2._getSoundIds(id);
          for (var i2 = 0; i2 < ids.length; i2++) {
            sound = self2._soundById(ids[i2]);
            if (sound) {
              sound._loop = loop;
              if (self2._webAudio && sound._node && sound._node.bufferSource) {
                sound._node.bufferSource.loop = loop;
                if (loop) {
                  sound._node.bufferSource.loopStart = sound._start || 0;
                  sound._node.bufferSource.loopEnd = sound._stop;
                  if (self2.playing(ids[i2])) {
                    self2.pause(ids[i2], true);
                    self2.play(ids[i2], true);
                  }
                }
              }
            }
          }
          return self2;
        },
        rate: function() {
          var self2 = this;
          var args = arguments;
          var rate, id;
          if (args.length === 0) {
            id = self2._sounds[0]._id;
          } else if (args.length === 1) {
            var ids = self2._getSoundIds();
            var index = ids.indexOf(args[0]);
            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else {
              rate = parseFloat(args[0]);
            }
          } else if (args.length === 2) {
            rate = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          }
          var sound;
          if (typeof rate === "number") {
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "rate",
                action: function() {
                  self2.rate.apply(self2, args);
                }
              });
              return self2;
            }
            if (typeof id === "undefined") {
              self2._rate = rate;
            }
            id = self2._getSoundIds(id);
            for (var i2 = 0; i2 < id.length; i2++) {
              sound = self2._soundById(id[i2]);
              if (sound) {
                if (self2.playing(id[i2])) {
                  sound._rateSeek = self2.seek(id[i2]);
                  sound._playStart = self2._webAudio ? Howler2.ctx.currentTime : sound._playStart;
                }
                sound._rate = rate;
                if (self2._webAudio && sound._node && sound._node.bufferSource) {
                  sound._node.bufferSource.playbackRate.setValueAtTime(rate, Howler2.ctx.currentTime);
                } else if (sound._node) {
                  sound._node.playbackRate = rate;
                }
                var seek = self2.seek(id[i2]);
                var duration = (self2._sprite[sound._sprite][0] + self2._sprite[sound._sprite][1]) / 1e3 - seek;
                var timeout = duration * 1e3 / Math.abs(sound._rate);
                if (self2._endTimers[id[i2]] || !sound._paused) {
                  self2._clearTimer(id[i2]);
                  self2._endTimers[id[i2]] = setTimeout(self2._ended.bind(self2, sound), timeout);
                }
                self2._emit("rate", sound._id);
              }
            }
          } else {
            sound = self2._soundById(id);
            return sound ? sound._rate : self2._rate;
          }
          return self2;
        },
        seek: function() {
          var self2 = this;
          var args = arguments;
          var seek, id;
          if (args.length === 0) {
            if (self2._sounds.length) {
              id = self2._sounds[0]._id;
            }
          } else if (args.length === 1) {
            var ids = self2._getSoundIds();
            var index = ids.indexOf(args[0]);
            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else if (self2._sounds.length) {
              id = self2._sounds[0]._id;
              seek = parseFloat(args[0]);
            }
          } else if (args.length === 2) {
            seek = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          }
          if (typeof id === "undefined") {
            return 0;
          }
          if (typeof seek === "number" && (self2._state !== "loaded" || self2._playLock)) {
            self2._queue.push({
              event: "seek",
              action: function() {
                self2.seek.apply(self2, args);
              }
            });
            return self2;
          }
          var sound = self2._soundById(id);
          if (sound) {
            if (typeof seek === "number" && seek >= 0) {
              var playing = self2.playing(id);
              if (playing) {
                self2.pause(id, true);
              }
              sound._seek = seek;
              sound._ended = false;
              self2._clearTimer(id);
              if (!self2._webAudio && sound._node && !isNaN(sound._node.duration)) {
                sound._node.currentTime = seek;
              }
              var seekAndEmit = function() {
                if (playing) {
                  self2.play(id, true);
                }
                self2._emit("seek", id);
              };
              if (playing && !self2._webAudio) {
                var emitSeek = function() {
                  if (!self2._playLock) {
                    seekAndEmit();
                  } else {
                    setTimeout(emitSeek, 0);
                  }
                };
                setTimeout(emitSeek, 0);
              } else {
                seekAndEmit();
              }
            } else {
              if (self2._webAudio) {
                var realTime = self2.playing(id) ? Howler2.ctx.currentTime - sound._playStart : 0;
                var rateSeek = sound._rateSeek ? sound._rateSeek - sound._seek : 0;
                return sound._seek + (rateSeek + realTime * Math.abs(sound._rate));
              } else {
                return sound._node.currentTime;
              }
            }
          }
          return self2;
        },
        playing: function(id) {
          var self2 = this;
          if (typeof id === "number") {
            var sound = self2._soundById(id);
            return sound ? !sound._paused : false;
          }
          for (var i2 = 0; i2 < self2._sounds.length; i2++) {
            if (!self2._sounds[i2]._paused) {
              return true;
            }
          }
          return false;
        },
        duration: function(id) {
          var self2 = this;
          var duration = self2._duration;
          var sound = self2._soundById(id);
          if (sound) {
            duration = self2._sprite[sound._sprite][1] / 1e3;
          }
          return duration;
        },
        state: function() {
          return this._state;
        },
        unload: function() {
          var self2 = this;
          var sounds = self2._sounds;
          for (var i2 = 0; i2 < sounds.length; i2++) {
            if (!sounds[i2]._paused) {
              self2.stop(sounds[i2]._id);
            }
            if (!self2._webAudio) {
              self2._clearSound(sounds[i2]._node);
              sounds[i2]._node.removeEventListener("error", sounds[i2]._errorFn, false);
              sounds[i2]._node.removeEventListener(Howler2._canPlayEvent, sounds[i2]._loadFn, false);
              sounds[i2]._node.removeEventListener("ended", sounds[i2]._endFn, false);
              Howler2._releaseHtml5Audio(sounds[i2]._node);
            }
            delete sounds[i2]._node;
            self2._clearTimer(sounds[i2]._id);
          }
          var index = Howler2._howls.indexOf(self2);
          if (index >= 0) {
            Howler2._howls.splice(index, 1);
          }
          var remCache = true;
          for (i2 = 0; i2 < Howler2._howls.length; i2++) {
            if (Howler2._howls[i2]._src === self2._src || self2._src.indexOf(Howler2._howls[i2]._src) >= 0) {
              remCache = false;
              break;
            }
          }
          if (cache && remCache) {
            delete cache[self2._src];
          }
          Howler2.noAudio = false;
          self2._state = "unloaded";
          self2._sounds = [];
          self2 = null;
          return null;
        },
        on: function(event, fn, id, once) {
          var self2 = this;
          var events = self2["_on" + event];
          if (typeof fn === "function") {
            events.push(once ? { id, fn, once } : { id, fn });
          }
          return self2;
        },
        off: function(event, fn, id) {
          var self2 = this;
          var events = self2["_on" + event];
          var i2 = 0;
          if (typeof fn === "number") {
            id = fn;
            fn = null;
          }
          if (fn || id) {
            for (i2 = 0; i2 < events.length; i2++) {
              var isId = id === events[i2].id;
              if (fn === events[i2].fn && isId || !fn && isId) {
                events.splice(i2, 1);
                break;
              }
            }
          } else if (event) {
            self2["_on" + event] = [];
          } else {
            var keys = Object.keys(self2);
            for (i2 = 0; i2 < keys.length; i2++) {
              if (keys[i2].indexOf("_on") === 0 && Array.isArray(self2[keys[i2]])) {
                self2[keys[i2]] = [];
              }
            }
          }
          return self2;
        },
        once: function(event, fn, id) {
          var self2 = this;
          self2.on(event, fn, id, 1);
          return self2;
        },
        _emit: function(event, id, msg) {
          var self2 = this;
          var events = self2["_on" + event];
          for (var i2 = events.length - 1; i2 >= 0; i2--) {
            if (!events[i2].id || events[i2].id === id || event === "load") {
              setTimeout(function(fn) {
                fn.call(this, id, msg);
              }.bind(self2, events[i2].fn), 0);
              if (events[i2].once) {
                self2.off(event, events[i2].fn, events[i2].id);
              }
            }
          }
          self2._loadQueue(event);
          return self2;
        },
        _loadQueue: function(event) {
          var self2 = this;
          if (self2._queue.length > 0) {
            var task = self2._queue[0];
            if (task.event === event) {
              self2._queue.shift();
              self2._loadQueue();
            }
            if (!event) {
              task.action();
            }
          }
          return self2;
        },
        _ended: function(sound) {
          var self2 = this;
          var sprite = sound._sprite;
          if (!self2._webAudio && sound._node && !sound._node.paused && !sound._node.ended && sound._node.currentTime < sound._stop) {
            setTimeout(self2._ended.bind(self2, sound), 100);
            return self2;
          }
          var loop = !!(sound._loop || self2._sprite[sprite][2]);
          self2._emit("end", sound._id);
          if (!self2._webAudio && loop) {
            self2.stop(sound._id, true).play(sound._id);
          }
          if (self2._webAudio && loop) {
            self2._emit("play", sound._id);
            sound._seek = sound._start || 0;
            sound._rateSeek = 0;
            sound._playStart = Howler2.ctx.currentTime;
            var timeout = (sound._stop - sound._start) * 1e3 / Math.abs(sound._rate);
            self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout);
          }
          if (self2._webAudio && !loop) {
            sound._paused = true;
            sound._ended = true;
            sound._seek = sound._start || 0;
            sound._rateSeek = 0;
            self2._clearTimer(sound._id);
            self2._cleanBuffer(sound._node);
            Howler2._autoSuspend();
          }
          if (!self2._webAudio && !loop) {
            self2.stop(sound._id, true);
          }
          return self2;
        },
        _clearTimer: function(id) {
          var self2 = this;
          if (self2._endTimers[id]) {
            if (typeof self2._endTimers[id] !== "function") {
              clearTimeout(self2._endTimers[id]);
            } else {
              var sound = self2._soundById(id);
              if (sound && sound._node) {
                sound._node.removeEventListener("ended", self2._endTimers[id], false);
              }
            }
            delete self2._endTimers[id];
          }
          return self2;
        },
        _soundById: function(id) {
          var self2 = this;
          for (var i2 = 0; i2 < self2._sounds.length; i2++) {
            if (id === self2._sounds[i2]._id) {
              return self2._sounds[i2];
            }
          }
          return null;
        },
        _inactiveSound: function() {
          var self2 = this;
          self2._drain();
          for (var i2 = 0; i2 < self2._sounds.length; i2++) {
            if (self2._sounds[i2]._ended) {
              return self2._sounds[i2].reset();
            }
          }
          return new Sound2(self2);
        },
        _drain: function() {
          var self2 = this;
          var limit = self2._pool;
          var cnt = 0;
          var i2 = 0;
          if (self2._sounds.length < limit) {
            return;
          }
          for (i2 = 0; i2 < self2._sounds.length; i2++) {
            if (self2._sounds[i2]._ended) {
              cnt++;
            }
          }
          for (i2 = self2._sounds.length - 1; i2 >= 0; i2--) {
            if (cnt <= limit) {
              return;
            }
            if (self2._sounds[i2]._ended) {
              if (self2._webAudio && self2._sounds[i2]._node) {
                self2._sounds[i2]._node.disconnect(0);
              }
              self2._sounds.splice(i2, 1);
              cnt--;
            }
          }
        },
        _getSoundIds: function(id) {
          var self2 = this;
          if (typeof id === "undefined") {
            var ids = [];
            for (var i2 = 0; i2 < self2._sounds.length; i2++) {
              ids.push(self2._sounds[i2]._id);
            }
            return ids;
          } else {
            return [id];
          }
        },
        _refreshBuffer: function(sound) {
          var self2 = this;
          sound._node.bufferSource = Howler2.ctx.createBufferSource();
          sound._node.bufferSource.buffer = cache[self2._src];
          if (sound._panner) {
            sound._node.bufferSource.connect(sound._panner);
          } else {
            sound._node.bufferSource.connect(sound._node);
          }
          sound._node.bufferSource.loop = sound._loop;
          if (sound._loop) {
            sound._node.bufferSource.loopStart = sound._start || 0;
            sound._node.bufferSource.loopEnd = sound._stop || 0;
          }
          sound._node.bufferSource.playbackRate.setValueAtTime(sound._rate, Howler2.ctx.currentTime);
          return self2;
        },
        _cleanBuffer: function(node) {
          var self2 = this;
          var isIOS = Howler2._navigator && Howler2._navigator.vendor.indexOf("Apple") >= 0;
          if (Howler2._scratchBuffer && node.bufferSource) {
            node.bufferSource.onended = null;
            node.bufferSource.disconnect(0);
            if (isIOS) {
              try {
                node.bufferSource.buffer = Howler2._scratchBuffer;
              } catch (e2) {
              }
            }
          }
          node.bufferSource = null;
          return self2;
        },
        _clearSound: function(node) {
          var checkIE = /MSIE |Trident\//.test(Howler2._navigator && Howler2._navigator.userAgent);
          if (!checkIE) {
            node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
          }
        }
      };
      var Sound2 = function(howl) {
        this._parent = howl;
        this.init();
      };
      Sound2.prototype = {
        init: function() {
          var self2 = this;
          var parent = self2._parent;
          self2._muted = parent._muted;
          self2._loop = parent._loop;
          self2._volume = parent._volume;
          self2._rate = parent._rate;
          self2._seek = 0;
          self2._paused = true;
          self2._ended = true;
          self2._sprite = "__default";
          self2._id = ++Howler2._counter;
          parent._sounds.push(self2);
          self2.create();
          return self2;
        },
        create: function() {
          var self2 = this;
          var parent = self2._parent;
          var volume = Howler2._muted || self2._muted || self2._parent._muted ? 0 : self2._volume;
          if (parent._webAudio) {
            self2._node = typeof Howler2.ctx.createGain === "undefined" ? Howler2.ctx.createGainNode() : Howler2.ctx.createGain();
            self2._node.gain.setValueAtTime(volume, Howler2.ctx.currentTime);
            self2._node.paused = true;
            self2._node.connect(Howler2.masterGain);
          } else if (!Howler2.noAudio) {
            self2._node = Howler2._obtainHtml5Audio();
            self2._errorFn = self2._errorListener.bind(self2);
            self2._node.addEventListener("error", self2._errorFn, false);
            self2._loadFn = self2._loadListener.bind(self2);
            self2._node.addEventListener(Howler2._canPlayEvent, self2._loadFn, false);
            self2._endFn = self2._endListener.bind(self2);
            self2._node.addEventListener("ended", self2._endFn, false);
            self2._node.src = parent._src;
            self2._node.preload = parent._preload === true ? "auto" : parent._preload;
            self2._node.volume = volume * Howler2.volume();
            self2._node.load();
          }
          return self2;
        },
        reset: function() {
          var self2 = this;
          var parent = self2._parent;
          self2._muted = parent._muted;
          self2._loop = parent._loop;
          self2._volume = parent._volume;
          self2._rate = parent._rate;
          self2._seek = 0;
          self2._rateSeek = 0;
          self2._paused = true;
          self2._ended = true;
          self2._sprite = "__default";
          self2._id = ++Howler2._counter;
          return self2;
        },
        _errorListener: function() {
          var self2 = this;
          self2._parent._emit("loaderror", self2._id, self2._node.error ? self2._node.error.code : 0);
          self2._node.removeEventListener("error", self2._errorFn, false);
        },
        _loadListener: function() {
          var self2 = this;
          var parent = self2._parent;
          parent._duration = Math.ceil(self2._node.duration * 10) / 10;
          if (Object.keys(parent._sprite).length === 0) {
            parent._sprite = { __default: [0, parent._duration * 1e3] };
          }
          if (parent._state !== "loaded") {
            parent._state = "loaded";
            parent._emit("load");
            parent._loadQueue();
          }
          self2._node.removeEventListener(Howler2._canPlayEvent, self2._loadFn, false);
        },
        _endListener: function() {
          var self2 = this;
          var parent = self2._parent;
          if (parent._duration === Infinity) {
            parent._duration = Math.ceil(self2._node.duration * 10) / 10;
            if (parent._sprite.__default[1] === Infinity) {
              parent._sprite.__default[1] = parent._duration * 1e3;
            }
            parent._ended(self2);
          }
          self2._node.removeEventListener("ended", self2._endFn, false);
        }
      };
      var cache = {};
      var loadBuffer = function(self2) {
        var url = self2._src;
        if (cache[url]) {
          self2._duration = cache[url].duration;
          loadSound(self2);
          return;
        }
        if (/^data:[^;]+;base64,/.test(url)) {
          var data2 = atob(url.split(",")[1]);
          var dataView = new Uint8Array(data2.length);
          for (var i2 = 0; i2 < data2.length; ++i2) {
            dataView[i2] = data2.charCodeAt(i2);
          }
          decodeAudioData(dataView.buffer, self2);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open(self2._xhr.method, url, true);
          xhr.withCredentials = self2._xhr.withCredentials;
          xhr.responseType = "arraybuffer";
          if (self2._xhr.headers) {
            Object.keys(self2._xhr.headers).forEach(function(key2) {
              xhr.setRequestHeader(key2, self2._xhr.headers[key2]);
            });
          }
          xhr.onload = function() {
            var code = (xhr.status + "")[0];
            if (code !== "0" && code !== "2" && code !== "3") {
              self2._emit("loaderror", null, "Failed loading audio file with status: " + xhr.status + ".");
              return;
            }
            decodeAudioData(xhr.response, self2);
          };
          xhr.onerror = function() {
            if (self2._webAudio) {
              self2._html5 = true;
              self2._webAudio = false;
              self2._sounds = [];
              delete cache[url];
              self2.load();
            }
          };
          safeXhrSend(xhr);
        }
      };
      var safeXhrSend = function(xhr) {
        try {
          xhr.send();
        } catch (e2) {
          xhr.onerror();
        }
      };
      var decodeAudioData = function(arraybuffer, self2) {
        var error2 = function() {
          self2._emit("loaderror", null, "Decoding audio data failed.");
        };
        var success = function(buffer) {
          if (buffer && self2._sounds.length > 0) {
            cache[self2._src] = buffer;
            loadSound(self2, buffer);
          } else {
            error2();
          }
        };
        if (typeof Promise !== "undefined" && Howler2.ctx.decodeAudioData.length === 1) {
          Howler2.ctx.decodeAudioData(arraybuffer).then(success).catch(error2);
        } else {
          Howler2.ctx.decodeAudioData(arraybuffer, success, error2);
        }
      };
      var loadSound = function(self2, buffer) {
        if (buffer && !self2._duration) {
          self2._duration = buffer.duration;
        }
        if (Object.keys(self2._sprite).length === 0) {
          self2._sprite = { __default: [0, self2._duration * 1e3] };
        }
        if (self2._state !== "loaded") {
          self2._state = "loaded";
          self2._emit("load");
          self2._loadQueue();
        }
      };
      var setupAudioContext = function() {
        if (!Howler2.usingWebAudio) {
          return;
        }
        try {
          if (typeof AudioContext !== "undefined") {
            Howler2.ctx = new AudioContext();
          } else if (typeof webkitAudioContext !== "undefined") {
            Howler2.ctx = new webkitAudioContext();
          } else {
            Howler2.usingWebAudio = false;
          }
        } catch (e2) {
          Howler2.usingWebAudio = false;
        }
        if (!Howler2.ctx) {
          Howler2.usingWebAudio = false;
        }
        var iOS = /iP(hone|od|ad)/.test(Howler2._navigator && Howler2._navigator.platform);
        var appVersion = Howler2._navigator && Howler2._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        var version = appVersion ? parseInt(appVersion[1], 10) : null;
        if (iOS && version && version < 9) {
          var safari = /safari/.test(Howler2._navigator && Howler2._navigator.userAgent.toLowerCase());
          if (Howler2._navigator && !safari) {
            Howler2.usingWebAudio = false;
          }
        }
        if (Howler2.usingWebAudio) {
          Howler2.masterGain = typeof Howler2.ctx.createGain === "undefined" ? Howler2.ctx.createGainNode() : Howler2.ctx.createGain();
          Howler2.masterGain.gain.setValueAtTime(Howler2._muted ? 0 : Howler2._volume, Howler2.ctx.currentTime);
          Howler2.masterGain.connect(Howler2.ctx.destination);
        }
        Howler2._setup();
      };
      if (typeof define === "function" && define.amd) {
        define([], function() {
          return {
            Howler: Howler2,
            Howl: Howl2
          };
        });
      }
      if (typeof exports !== "undefined") {
        exports.Howler = Howler2;
        exports.Howl = Howl2;
      }
      if (typeof global !== "undefined") {
        global.HowlerGlobal = HowlerGlobal2;
        global.Howler = Howler2;
        global.Howl = Howl2;
        global.Sound = Sound2;
      } else if (typeof window !== "undefined") {
        window.HowlerGlobal = HowlerGlobal2;
        window.Howler = Howler2;
        window.Howl = Howl2;
        window.Sound = Sound2;
      }
    })();
    (function() {
      "use strict";
      HowlerGlobal.prototype._pos = [0, 0, 0];
      HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
      HowlerGlobal.prototype.stereo = function(pan) {
        var self2 = this;
        if (!self2.ctx || !self2.ctx.listener) {
          return self2;
        }
        for (var i2 = self2._howls.length - 1; i2 >= 0; i2--) {
          self2._howls[i2].stereo(pan);
        }
        return self2;
      };
      HowlerGlobal.prototype.pos = function(x2, y, z) {
        var self2 = this;
        if (!self2.ctx || !self2.ctx.listener) {
          return self2;
        }
        y = typeof y !== "number" ? self2._pos[1] : y;
        z = typeof z !== "number" ? self2._pos[2] : z;
        if (typeof x2 === "number") {
          self2._pos = [x2, y, z];
          if (typeof self2.ctx.listener.positionX !== "undefined") {
            self2.ctx.listener.positionX.setTargetAtTime(self2._pos[0], Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.positionY.setTargetAtTime(self2._pos[1], Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.positionZ.setTargetAtTime(self2._pos[2], Howler.ctx.currentTime, 0.1);
          } else {
            self2.ctx.listener.setPosition(self2._pos[0], self2._pos[1], self2._pos[2]);
          }
        } else {
          return self2._pos;
        }
        return self2;
      };
      HowlerGlobal.prototype.orientation = function(x2, y, z, xUp, yUp, zUp) {
        var self2 = this;
        if (!self2.ctx || !self2.ctx.listener) {
          return self2;
        }
        var or = self2._orientation;
        y = typeof y !== "number" ? or[1] : y;
        z = typeof z !== "number" ? or[2] : z;
        xUp = typeof xUp !== "number" ? or[3] : xUp;
        yUp = typeof yUp !== "number" ? or[4] : yUp;
        zUp = typeof zUp !== "number" ? or[5] : zUp;
        if (typeof x2 === "number") {
          self2._orientation = [x2, y, z, xUp, yUp, zUp];
          if (typeof self2.ctx.listener.forwardX !== "undefined") {
            self2.ctx.listener.forwardX.setTargetAtTime(x2, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.forwardY.setTargetAtTime(y, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.forwardZ.setTargetAtTime(z, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.upX.setTargetAtTime(xUp, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.upY.setTargetAtTime(yUp, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.upZ.setTargetAtTime(zUp, Howler.ctx.currentTime, 0.1);
          } else {
            self2.ctx.listener.setOrientation(x2, y, z, xUp, yUp, zUp);
          }
        } else {
          return or;
        }
        return self2;
      };
      Howl.prototype.init = function(_super) {
        return function(o) {
          var self2 = this;
          self2._orientation = o.orientation || [1, 0, 0];
          self2._stereo = o.stereo || null;
          self2._pos = o.pos || null;
          self2._pannerAttr = {
            coneInnerAngle: typeof o.coneInnerAngle !== "undefined" ? o.coneInnerAngle : 360,
            coneOuterAngle: typeof o.coneOuterAngle !== "undefined" ? o.coneOuterAngle : 360,
            coneOuterGain: typeof o.coneOuterGain !== "undefined" ? o.coneOuterGain : 0,
            distanceModel: typeof o.distanceModel !== "undefined" ? o.distanceModel : "inverse",
            maxDistance: typeof o.maxDistance !== "undefined" ? o.maxDistance : 1e4,
            panningModel: typeof o.panningModel !== "undefined" ? o.panningModel : "HRTF",
            refDistance: typeof o.refDistance !== "undefined" ? o.refDistance : 1,
            rolloffFactor: typeof o.rolloffFactor !== "undefined" ? o.rolloffFactor : 1
          };
          self2._onstereo = o.onstereo ? [{ fn: o.onstereo }] : [];
          self2._onpos = o.onpos ? [{ fn: o.onpos }] : [];
          self2._onorientation = o.onorientation ? [{ fn: o.onorientation }] : [];
          return _super.call(this, o);
        };
      }(Howl.prototype.init);
      Howl.prototype.stereo = function(pan, id) {
        var self2 = this;
        if (!self2._webAudio) {
          return self2;
        }
        if (self2._state !== "loaded") {
          self2._queue.push({
            event: "stereo",
            action: function() {
              self2.stereo(pan, id);
            }
          });
          return self2;
        }
        var pannerType = typeof Howler.ctx.createStereoPanner === "undefined" ? "spatial" : "stereo";
        if (typeof id === "undefined") {
          if (typeof pan === "number") {
            self2._stereo = pan;
            self2._pos = [pan, 0, 0];
          } else {
            return self2._stereo;
          }
        }
        var ids = self2._getSoundIds(id);
        for (var i2 = 0; i2 < ids.length; i2++) {
          var sound = self2._soundById(ids[i2]);
          if (sound) {
            if (typeof pan === "number") {
              sound._stereo = pan;
              sound._pos = [pan, 0, 0];
              if (sound._node) {
                sound._pannerAttr.panningModel = "equalpower";
                if (!sound._panner || !sound._panner.pan) {
                  setupPanner(sound, pannerType);
                }
                if (pannerType === "spatial") {
                  if (typeof sound._panner.positionX !== "undefined") {
                    sound._panner.positionX.setValueAtTime(pan, Howler.ctx.currentTime);
                    sound._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime);
                    sound._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime);
                  } else {
                    sound._panner.setPosition(pan, 0, 0);
                  }
                } else {
                  sound._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
                }
              }
              self2._emit("stereo", sound._id);
            } else {
              return sound._stereo;
            }
          }
        }
        return self2;
      };
      Howl.prototype.pos = function(x2, y, z, id) {
        var self2 = this;
        if (!self2._webAudio) {
          return self2;
        }
        if (self2._state !== "loaded") {
          self2._queue.push({
            event: "pos",
            action: function() {
              self2.pos(x2, y, z, id);
            }
          });
          return self2;
        }
        y = typeof y !== "number" ? 0 : y;
        z = typeof z !== "number" ? -0.5 : z;
        if (typeof id === "undefined") {
          if (typeof x2 === "number") {
            self2._pos = [x2, y, z];
          } else {
            return self2._pos;
          }
        }
        var ids = self2._getSoundIds(id);
        for (var i2 = 0; i2 < ids.length; i2++) {
          var sound = self2._soundById(ids[i2]);
          if (sound) {
            if (typeof x2 === "number") {
              sound._pos = [x2, y, z];
              if (sound._node) {
                if (!sound._panner || sound._panner.pan) {
                  setupPanner(sound, "spatial");
                }
                if (typeof sound._panner.positionX !== "undefined") {
                  sound._panner.positionX.setValueAtTime(x2, Howler.ctx.currentTime);
                  sound._panner.positionY.setValueAtTime(y, Howler.ctx.currentTime);
                  sound._panner.positionZ.setValueAtTime(z, Howler.ctx.currentTime);
                } else {
                  sound._panner.setPosition(x2, y, z);
                }
              }
              self2._emit("pos", sound._id);
            } else {
              return sound._pos;
            }
          }
        }
        return self2;
      };
      Howl.prototype.orientation = function(x2, y, z, id) {
        var self2 = this;
        if (!self2._webAudio) {
          return self2;
        }
        if (self2._state !== "loaded") {
          self2._queue.push({
            event: "orientation",
            action: function() {
              self2.orientation(x2, y, z, id);
            }
          });
          return self2;
        }
        y = typeof y !== "number" ? self2._orientation[1] : y;
        z = typeof z !== "number" ? self2._orientation[2] : z;
        if (typeof id === "undefined") {
          if (typeof x2 === "number") {
            self2._orientation = [x2, y, z];
          } else {
            return self2._orientation;
          }
        }
        var ids = self2._getSoundIds(id);
        for (var i2 = 0; i2 < ids.length; i2++) {
          var sound = self2._soundById(ids[i2]);
          if (sound) {
            if (typeof x2 === "number") {
              sound._orientation = [x2, y, z];
              if (sound._node) {
                if (!sound._panner) {
                  if (!sound._pos) {
                    sound._pos = self2._pos || [0, 0, -0.5];
                  }
                  setupPanner(sound, "spatial");
                }
                if (typeof sound._panner.orientationX !== "undefined") {
                  sound._panner.orientationX.setValueAtTime(x2, Howler.ctx.currentTime);
                  sound._panner.orientationY.setValueAtTime(y, Howler.ctx.currentTime);
                  sound._panner.orientationZ.setValueAtTime(z, Howler.ctx.currentTime);
                } else {
                  sound._panner.setOrientation(x2, y, z);
                }
              }
              self2._emit("orientation", sound._id);
            } else {
              return sound._orientation;
            }
          }
        }
        return self2;
      };
      Howl.prototype.pannerAttr = function() {
        var self2 = this;
        var args = arguments;
        var o, id, sound;
        if (!self2._webAudio) {
          return self2;
        }
        if (args.length === 0) {
          return self2._pannerAttr;
        } else if (args.length === 1) {
          if (typeof args[0] === "object") {
            o = args[0];
            if (typeof id === "undefined") {
              if (!o.pannerAttr) {
                o.pannerAttr = {
                  coneInnerAngle: o.coneInnerAngle,
                  coneOuterAngle: o.coneOuterAngle,
                  coneOuterGain: o.coneOuterGain,
                  distanceModel: o.distanceModel,
                  maxDistance: o.maxDistance,
                  refDistance: o.refDistance,
                  rolloffFactor: o.rolloffFactor,
                  panningModel: o.panningModel
                };
              }
              self2._pannerAttr = {
                coneInnerAngle: typeof o.pannerAttr.coneInnerAngle !== "undefined" ? o.pannerAttr.coneInnerAngle : self2._coneInnerAngle,
                coneOuterAngle: typeof o.pannerAttr.coneOuterAngle !== "undefined" ? o.pannerAttr.coneOuterAngle : self2._coneOuterAngle,
                coneOuterGain: typeof o.pannerAttr.coneOuterGain !== "undefined" ? o.pannerAttr.coneOuterGain : self2._coneOuterGain,
                distanceModel: typeof o.pannerAttr.distanceModel !== "undefined" ? o.pannerAttr.distanceModel : self2._distanceModel,
                maxDistance: typeof o.pannerAttr.maxDistance !== "undefined" ? o.pannerAttr.maxDistance : self2._maxDistance,
                refDistance: typeof o.pannerAttr.refDistance !== "undefined" ? o.pannerAttr.refDistance : self2._refDistance,
                rolloffFactor: typeof o.pannerAttr.rolloffFactor !== "undefined" ? o.pannerAttr.rolloffFactor : self2._rolloffFactor,
                panningModel: typeof o.pannerAttr.panningModel !== "undefined" ? o.pannerAttr.panningModel : self2._panningModel
              };
            }
          } else {
            sound = self2._soundById(parseInt(args[0], 10));
            return sound ? sound._pannerAttr : self2._pannerAttr;
          }
        } else if (args.length === 2) {
          o = args[0];
          id = parseInt(args[1], 10);
        }
        var ids = self2._getSoundIds(id);
        for (var i2 = 0; i2 < ids.length; i2++) {
          sound = self2._soundById(ids[i2]);
          if (sound) {
            var pa = sound._pannerAttr;
            pa = {
              coneInnerAngle: typeof o.coneInnerAngle !== "undefined" ? o.coneInnerAngle : pa.coneInnerAngle,
              coneOuterAngle: typeof o.coneOuterAngle !== "undefined" ? o.coneOuterAngle : pa.coneOuterAngle,
              coneOuterGain: typeof o.coneOuterGain !== "undefined" ? o.coneOuterGain : pa.coneOuterGain,
              distanceModel: typeof o.distanceModel !== "undefined" ? o.distanceModel : pa.distanceModel,
              maxDistance: typeof o.maxDistance !== "undefined" ? o.maxDistance : pa.maxDistance,
              refDistance: typeof o.refDistance !== "undefined" ? o.refDistance : pa.refDistance,
              rolloffFactor: typeof o.rolloffFactor !== "undefined" ? o.rolloffFactor : pa.rolloffFactor,
              panningModel: typeof o.panningModel !== "undefined" ? o.panningModel : pa.panningModel
            };
            var panner = sound._panner;
            if (panner) {
              panner.coneInnerAngle = pa.coneInnerAngle;
              panner.coneOuterAngle = pa.coneOuterAngle;
              panner.coneOuterGain = pa.coneOuterGain;
              panner.distanceModel = pa.distanceModel;
              panner.maxDistance = pa.maxDistance;
              panner.refDistance = pa.refDistance;
              panner.rolloffFactor = pa.rolloffFactor;
              panner.panningModel = pa.panningModel;
            } else {
              if (!sound._pos) {
                sound._pos = self2._pos || [0, 0, -0.5];
              }
              setupPanner(sound, "spatial");
            }
          }
        }
        return self2;
      };
      Sound.prototype.init = function(_super) {
        return function() {
          var self2 = this;
          var parent = self2._parent;
          self2._orientation = parent._orientation;
          self2._stereo = parent._stereo;
          self2._pos = parent._pos;
          self2._pannerAttr = parent._pannerAttr;
          _super.call(this);
          if (self2._stereo) {
            parent.stereo(self2._stereo);
          } else if (self2._pos) {
            parent.pos(self2._pos[0], self2._pos[1], self2._pos[2], self2._id);
          }
        };
      }(Sound.prototype.init);
      Sound.prototype.reset = function(_super) {
        return function() {
          var self2 = this;
          var parent = self2._parent;
          self2._orientation = parent._orientation;
          self2._stereo = parent._stereo;
          self2._pos = parent._pos;
          self2._pannerAttr = parent._pannerAttr;
          if (self2._stereo) {
            parent.stereo(self2._stereo);
          } else if (self2._pos) {
            parent.pos(self2._pos[0], self2._pos[1], self2._pos[2], self2._id);
          } else if (self2._panner) {
            self2._panner.disconnect(0);
            self2._panner = void 0;
            parent._refreshBuffer(self2);
          }
          return _super.call(this);
        };
      }(Sound.prototype.reset);
      var setupPanner = function(sound, type) {
        type = type || "spatial";
        if (type === "spatial") {
          sound._panner = Howler.ctx.createPanner();
          sound._panner.coneInnerAngle = sound._pannerAttr.coneInnerAngle;
          sound._panner.coneOuterAngle = sound._pannerAttr.coneOuterAngle;
          sound._panner.coneOuterGain = sound._pannerAttr.coneOuterGain;
          sound._panner.distanceModel = sound._pannerAttr.distanceModel;
          sound._panner.maxDistance = sound._pannerAttr.maxDistance;
          sound._panner.refDistance = sound._pannerAttr.refDistance;
          sound._panner.rolloffFactor = sound._pannerAttr.rolloffFactor;
          sound._panner.panningModel = sound._pannerAttr.panningModel;
          if (typeof sound._panner.positionX !== "undefined") {
            sound._panner.positionX.setValueAtTime(sound._pos[0], Howler.ctx.currentTime);
            sound._panner.positionY.setValueAtTime(sound._pos[1], Howler.ctx.currentTime);
            sound._panner.positionZ.setValueAtTime(sound._pos[2], Howler.ctx.currentTime);
          } else {
            sound._panner.setPosition(sound._pos[0], sound._pos[1], sound._pos[2]);
          }
          if (typeof sound._panner.orientationX !== "undefined") {
            sound._panner.orientationX.setValueAtTime(sound._orientation[0], Howler.ctx.currentTime);
            sound._panner.orientationY.setValueAtTime(sound._orientation[1], Howler.ctx.currentTime);
            sound._panner.orientationZ.setValueAtTime(sound._orientation[2], Howler.ctx.currentTime);
          } else {
            sound._panner.setOrientation(sound._orientation[0], sound._orientation[1], sound._orientation[2]);
          }
        } else {
          sound._panner = Howler.ctx.createStereoPanner();
          sound._panner.pan.setValueAtTime(sound._stereo, Howler.ctx.currentTime);
        }
        sound._panner.connect(sound._node);
        if (!sound._paused) {
          sound._parent.pause(sound._id, true).play(sound._id, true);
        }
      };
    })();
  }
});

// .svelte-kit/output/server/chunks/Iklan-e7ec31fa.js
var import_overlayscrollbars, import_howler, css, PopUp, Iklan;
var init_Iklan_e7ec31fa = __esm({
  ".svelte-kit/output/server/chunks/Iklan-e7ec31fa.js"() {
    init_index_437e72a6();
    import_overlayscrollbars = __toESM(require_OverlayScrollbars(), 1);
    import_howler = __toESM(require_howler(), 1);
    init_env_0d653bb5();
    css = {
      code: ".popup.svelte-16bm29m.svelte-16bm29m{position:fixed;top:0;left:0;width:100vw;background-color:rgba(0, 0, 0, 0.5);z-index:997;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(2px)}.popup-content.svelte-16bm29m.svelte-16bm29m{width:35rem;max-width:90%;background-color:#ece6de;padding:8px;text-align:center;color:#383b40;position:relative;zoom:120%}.mobile .popup-content.svelte-16bm29m.svelte-16bm29m{max-width:100vh}.container.svelte-16bm29m.svelte-16bm29m{width:100%;height:100%;border:2px solid #ddd5c8}.gi-primo-star.svelte-16bm29m.svelte-16bm29m{color:#fdf0ac;font-size:1.5rem;display:inline-block;position:absolute;filter:drop-shadow(0 0 7px rgba(227, 149, 48, 0.9))}.top-left.svelte-16bm29m.svelte-16bm29m{top:-0.8rem;left:-0.5rem;transform:rotate(-45deg)}.top-right.svelte-16bm29m.svelte-16bm29m{top:-0.8rem;right:-0.5rem;transform:rotate(45deg)}.bottom-left.svelte-16bm29m.svelte-16bm29m{bottom:-0.8rem;left:-0.5rem;transform:rotate(-135deg)}.bottom-right.svelte-16bm29m.svelte-16bm29m{bottom:-0.8rem;right:-0.5rem;transform:rotate(135deg)}.bg.svelte-16bm29m.svelte-16bm29m{font-size:17em;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);color:#e4dcce}.pop-header.svelte-16bm29m.svelte-16bm29m{font-size:1.2rem;margin:0.4rem 7%;padding-bottom:0.4rem;border-bottom:0.2rem solid #ddd5c8;position:relative;z-index:+1}.pop-body.svelte-16bm29m.svelte-16bm29m{height:15rem;max-height:45vh;position:relative;z-index:+1;font-size:1.2rem;display:flex;justify-content:center}.pop-body.large.svelte-16bm29m.svelte-16bm29m{height:25rem;max-height:70vh}.pop-footer.svelte-16bm29m.svelte-16bm29m{display:flex;padding:0.7rem 0;justify-content:space-around;position:relative;z-index:+1}.pop-footer.svelte-16bm29m.svelte-16bm29m::before{width:80%;content:'';display:block;border-top:0.2rem solid #ddd5c8;position:absolute;top:0;left:50%;transform:translateX(-50%)}.pop-footer.svelte-16bm29m button.svelte-16bm29m{border-radius:40px;color:white;background-color:#4a5265;display:inline-flex;align-items:center;justify-content:space-between;padding:0.2em 2.5em 0.3em 0.1em;transition:all 0.2s}.pop-footer.svelte-16bm29m button i.svelte-16bm29m{width:1.7rem;height:1.7rem;background-color:#353533;border-radius:100%;display:inline-flex;justify-content:center;align-items:center;font-size:0.8rem;margin-right:1.5rem}.pop-footer.svelte-16bm29m button.svelte-16bm29m:hover{background-color:rgb(51, 57, 71)}.gi-times.svelte-16bm29m.svelte-16bm29m{color:#3f9ad1}.gi-circle-o.svelte-16bm29m.svelte-16bm29m{color:#ffc107}",
      map: null
    };
    PopUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $viewportHeight, $$unsubscribe_viewportHeight;
      $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
      let { show = false } = $$props;
      let { title = "" } = $$props;
      let { confirm = true } = $$props;
      let { button = "all" } = $$props;
      let { sfx = true } = $$props;
      let content;
      createEventDispatcher();
      if ($$props.show === void 0 && $$bindings.show && show !== void 0)
        $$bindings.show(show);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.confirm === void 0 && $$bindings.confirm && confirm !== void 0)
        $$bindings.confirm(confirm);
      if ($$props.button === void 0 && $$bindings.button && button !== void 0)
        $$bindings.button(button);
      if ($$props.sfx === void 0 && $$bindings.sfx && sfx !== void 0)
        $$bindings.sfx(sfx);
      $$result.css.add(css);
      $$unsubscribe_viewportHeight();
      return `${show ? `<div class="${"popup svelte-16bm29m"}" style="${"height: " + escape($viewportHeight) + "px;"}"><div class="${"popup-content svelte-16bm29m"}"><i class="${"gi-primo-star top-left svelte-16bm29m"}"></i>
			<i class="${"gi-primo-star top-right svelte-16bm29m"}"></i>
			<i class="${"gi-primo-star bottom-left svelte-16bm29m"}"></i>
			<i class="${"gi-primo-star bottom-right svelte-16bm29m"}"></i>
			<i class="${"gi-inazuma bg svelte-16bm29m"}"></i>
			<div class="${"container svelte-16bm29m"}">${title ? `<h1 class="${"pop-header svelte-16bm29m"}">${escape(title)}</h1>` : ``}
				<div class="${["pop-body svelte-16bm29m", !title && !confirm ? "large" : ""].join(" ").trim()}"${add_attribute("this", content, 0)}>${slots.default ? slots.default({}) : ``}</div>

				${confirm ? `<div class="${"pop-footer svelte-16bm29m"}">${["cancel", "all"].indexOf(button) > -1 ? `<button class="${"cancel svelte-16bm29m"}"><i class="${"gi-times svelte-16bm29m"}"></i>
								<span>Cancel </span></button>` : ``}
						${["confirm", "all"].indexOf(button) > -1 ? `<button class="${"confirm svelte-16bm29m"}"><i class="${"gi-circle-o svelte-16bm29m"}"></i>
								<span>Confirm </span></button>` : ``}</div>` : ``}</div></div></div>` : ``}`;
    });
    Iklan = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { type = "" } = $$props;
      let { head = false } = $$props;
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.head === void 0 && $$bindings.head && head !== void 0)
        $$bindings.head(head);
      return `${type === "banner" ? `<ins class="${"adsbygoogle"}" style="${"display:block"}" data-ad-client="${"ca-pub-1874822310102113"}" data-ad-slot="${"6827309798"}" data-ad-format="${"auto"}" data-full-width-responsive="${"true"}"></ins>` : ``}

${head ? `<script data-cfasync="${"false"}" type="${"text/javascript"}" data-adel="${"atag"}" src="${"//acacdn.com/script/atg.js"}" czid="${"v1xd6wvvpe"}"><\/script>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
var import_overlayscrollbars2, import_howler2, getStores, page, data, css$1, Disclaimer, css2, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_437e72a6();
    init_env_0d653bb5();
    import_overlayscrollbars2 = __toESM(require_OverlayScrollbars(), 1);
    init_Iklan_e7ec31fa();
    import_howler2 = __toESM(require_howler(), 1);
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        get preloading() {
          console.error("stores.preloading is deprecated; use stores.navigating instead");
          return {
            subscribe: stores.navigating.subscribe
          };
        },
        session: stores.session,
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    data = [
      {
        date: "01-Sep-2021",
        description: [
          "<strong> Raiden Shogun and Kujou Sara </strong> Banner was here !",
          "<strong> Engulfing Lightning </strong> Weapon Banner has been added"
        ]
      },
      {
        date: "10-Sep-2021",
        description: [
          "Now you can <strong>wishing on previous banner</strong> by clicking <strong>(x)</strong> button on the top right of the page",
          "Now you can <strong>create screenshot and link to share</strong> when wishing"
        ]
      },
      {
        date: "21-Sep-2021",
        description: [
          "<strong> Sagonomia Kokomi </strong> is ready to pull !",
          "<strong> Everlasting Moonglow </strong> Weapon Banner has been added"
        ]
      },
      {
        date: "30-Sep-2021",
        description: [
          "Add more previous banner, <strong> Eula, Zhongli, Tartaglia/Childe, Albedo, Ganyu, Xiao, Hu Tao, Venti </strong> is ready to pull ! <br/> Click <strong>(x)</strong> button on the top right of the page to change the banner"
        ]
      },
      {
        date: "13-Oct-2021",
        description: [
          "<strong> Tartaglia </strong> is ready to pull !",
          "<strong> Polar Star </strong> Weapon Banner has been added"
        ]
      },
      {
        date: "2-Nov-2021",
        description: [
          "<strong> Hu Tao </strong> Character Banner has been added !",
          "<strong> Thoma </strong> is ready to pull !",
          "<strong> Staff of Homma </strong> & <strong>Elegy for The End</strong> Weapon Banner has been added"
        ]
      },
      {
        date: "24-Nov-2021",
        description: [
          "<strong> Albedo </strong> Banner was here !",
          "<strong> Eula </strong> Banner also here !",
          "<strong> Freedom Sworn & Song of Broken Pines </strong> Weapon Banner has been added"
        ]
      },
      {
        date: "08-Des-2021",
        description: [
          "<strong>Fixing Bugs</strong> of History.",
          'if you find any error, follow this steps to reset browser cache specialy only for WIsh Simulator Site . Open Inpect ELement ( CTRL + Shift i ) -> Application -> Storage -> Click on "Clear Site Data" Button',
          "Ignore the steps above if this is the first time you visit this site or if you already do reset"
        ]
      },
      {
        date: "14-Des-2021",
        description: [
          "<strong> Arrataki Itto </strong> character Banner is ready to pull",
          "<strong> Redhorn Stonethresher </strong> Weapon Banner has been added !"
        ]
      },
      {
        date: "29-Des-2021",
        description: [
          "Implement Epitomized Path System to Weapon Banner for patch 2.0 and above"
        ]
      },
      {
        date: "05-Jan-2022",
        description: [
          "Now you can pull <strong> Shenhe </strong> and <strong>Yunjin</strong> the Best Waifu!",
          "<strong>Calamity Queller</strong> Weapon Banner was added"
        ]
      },
      {
        date: "25-Jan-2022",
        description: [
          "<strong>Gong Xi Fa Cai</strong>. Wish you luck on Lantern Rite event",
          "<strong> Zhongli and Ganyu Rerun Banner </strong> Already out here !",
          "<strong> Vortex and Amos </strong> Weapon Rerun Banner is ready to pull too !"
        ]
      },
      {
        date: "11-Feb-2022",
        description: [
          "Now you can pull without worry about running out of fate, just activate the <b>Unlimited Fates Option</b> in Menu by clicking the <b>(?)</b> button on top of the page"
        ]
      },
      {
        date: "16-Feb-2022",
        description: [
          "Event Banner Updated, Now you can pull <strong> Yae Miko </strong> here !",
          "Yae Miko signature Weapon, <strong>Kagura's Verity</strong> is ready to pull too !",
          "Inventory Updated, Now You can show all Characters and Weapons both you already got or not"
        ]
      },
      {
        date: "08-Mar-2022",
        description: [
          "<strong> Raiden Shogun Rerun </strong> Banner was here !",
          "<strong> Sagonomia Kokomi </strong> is ready to pull too!",
          "Weapon Banner Updated, <b> Engulfing Lightning </b> and <b>Everlasting Moonglow</b> already added"
        ]
      },
      {
        date: "23-Mar-2022",
        featured: true,
        description: [
          "<strong>Due to high number of visitors</strong>, Our monthly bandwidth also increased. We need to upgrade the hosting plan to keep this app alive. So <strong>We'll show some ad on </strong> this app. <br/> We're sorry to you, actually we don't want to ruin your wishing experience. If you feel annoyed with ad, feel free to use Ad blocker, we will not forbit you"
        ]
      },
      {
        date: "28-Mar-2022",
        description: [
          "<strong> Kamisato Ayato </strong> Banner was here !",
          "<strong> Venti </strong> is ready to pull too!",
          "Weapon Banner Updated, <b> Haran Geppaku Futsu </b> and <b>Elegy for the End</b> already added"
        ]
      },
      {
        date: "17-Apr-2022",
        featured: true,
        description: [
          "<strong> Kamisato Ayaka Rerun </strong> Banner already out !",
          "Weapon Banner Updated, <b> Mistsplitter Reforged </b> and <b>The Unforged</b> was here too!"
        ]
      },
      {
        date: "20-Apr-2022",
        description: [
          "We recently had to <strong>migrate our server </strong> for other reasons, so the old wishing histories isn't being tracked on the new server, We apologize for the inconvenience. We hope it doesn't happen again in the future, so you can enjoy the simulator peacefully"
        ]
      },
      {
        date: "29-May-2022",
        featured: true,
        description: [
          "<strong> Yelan </strong> Banner already out !",
          "<strong> Xiao 3rd Rerun </strong> Banner was here !",
          "Weapon Banner Updated, <b> Aqua Simulacra </b> and <b>Primordial Jade Winged Spear</b> are ready to pull !"
        ]
      }
    ];
    css$1 = {
      code: "section.svelte-1ftsz7p.svelte-1ftsz7p{width:100%;padding:0 1.5rem 1rem}.credit.svelte-1ftsz7p.svelte-1ftsz7p{font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size:0.9rem}.updates.svelte-1ftsz7p.svelte-1ftsz7p{text-align:left;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;background-color:#fff;font-size:0.97rem;height:8rem;padding:0 1rem;display:block;overflow:hidden}.updates.svelte-1ftsz7p span.svelte-1ftsz7p{font-weight:bold;color:#f7cf33;display:block;padding-top:0.5rem}.updates.svelte-1ftsz7p .tgl.svelte-1ftsz7p{color:#bd6932}.updates.svelte-1ftsz7p p.svelte-1ftsz7p{padding-left:1rem;position:relative;line-height:1rem;margin:0.5rem 0}.updates.svelte-1ftsz7p p.svelte-1ftsz7p::before{content:'*';display:inline-block;width:10px;line-height:0;font-size:1.3rem;padding-top:0.5rem;position:absolute;left:0;top:50%;transform:translateY(-50%)}.sp.svelte-1ftsz7p.svelte-1ftsz7p{font-size:0.97rem;padding:0.5rem 0 1rem}a.svelte-1ftsz7p.svelte-1ftsz7p:active{transform:scale(0.9);background-color:#fff;color:#000}",
      map: null
    };
    Disclaimer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $showDisclaimer, $$unsubscribe_showDisclaimer;
      $$unsubscribe_showDisclaimer = subscribe(showDisclaimer, (value) => $showDisclaimer = value);
      let content;
      const updates = data.filter(({ featured }) => !!featured);
      $$result.css.add(css$1);
      $$unsubscribe_showDisclaimer();
      return `${validate_component(PopUp, "PopUp").$$render($$result, {
        show: $showDisclaimer,
        title: "Genshin Impact Wish Simulator",
        button: "confirm"
      }, {}, {
        default: () => {
          return `<section class="${"svelte-1ftsz7p"}"><p class="${"sp svelte-1ftsz7p"}">This is purely a fan made Application, enjoy it !</p>
		<div class="${"updates svelte-1ftsz7p"}"${add_attribute("this", content, 0)}>${each(updates.reverse(), ({ description, date }, i2) => {
            return `<span class="${"svelte-1ftsz7p"}"><i class="${"tgl svelte-1ftsz7p"}">${escape(date)}</i>
					${i2 === 0 ? `( Latest Update )` : ``}</span>
				${each(description, (txt) => {
              return `<p class="${"svelte-1ftsz7p"}"><!-- HTML_TAG_START -->${txt}<!-- HTML_TAG_END --></p>`;
            })}`;
          })}
			<div style="${"height: .5rem"}"></div></div>
		
		<p class="${"credit svelte-1ftsz7p"}">All assets used in this site are owned by Mihoyo.</p>
		<div class="${"credit svelte-1ftsz7p"}" style="${"display:flex;justify-content:center;margin-top: 5px;margin-bottom: -8px;"}">Credit to\xA0<div class="${"credit svelte-1ftsz7p"}" style="${"text-decoration:underline;"}">AguzzTN54</div></div> <p><a href="${"https://github.com/AguzzTN54/Genshin-Impact-Wish-Simulator"}" target="${"_blank"}" style="${"color:purple;font-size: 12px;"}" class="${"svelte-1ftsz7p"}">Github</a></p></section>`;
        }
      })}`;
    });
    css2 = {
      code: "@import '../../node_modules/overlayscrollbars/css/OverlayScrollbars.css';.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle{background-color:#d2c69c;opacity:0.7}.os-theme-light > .os-scrollbar-vertical{width:8px}.os-theme-light > .os-scrollbar-horizontal{height:8px}main.svelte-1537kly.svelte-1537kly{display:block;width:100%;overflow:hidden}audio{visibility:hidden}.uid.svelte-1537kly.svelte-1537kly{display:block;position:fixed;bottom:0px;right:5px;z-index:998;color:#fff;text-shadow:0 0 1.5px rgba(0, 0, 0, 0.7);font-family:Roboto, sans-serif;pointer-events:none}.preview.svelte-1537kly .uid.svelte-1537kly{pointer-events:unset;right:unset;left:1rem;bottom:1rem}.logo.svelte-1537kly.svelte-1537kly{display:none}.preview.svelte-1537kly .logo.svelte-1537kly{display:block;width:30vh;max-width:30%;position:fixed;bottom:0px;right:5px}",
      map: null
    };
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let preview;
      let $$unsubscribe_isMobile;
      let $bannerActive, $$unsubscribe_bannerActive;
      let $bannerList, $$unsubscribe_bannerList;
      let $page, $$unsubscribe_page;
      let $mobileMode, $$unsubscribe_mobileMode;
      let $viewportHeight, $$unsubscribe_viewportHeight;
      $$unsubscribe_isMobile = subscribe(isMobile, (value) => value);
      $$unsubscribe_bannerActive = subscribe(bannerActive, (value) => $bannerActive = value);
      $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
      $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
      $$result.css.add(css2);
      preview = $page.url.pathname.split("/")[1] === "screen";
      {
        if ($bannerList.length > 0) {
          const { type } = $bannerList[$bannerActive];
          isAcquaintUsed.set(type === "standard" || type === "beginner");
        }
      }
      $$unsubscribe_isMobile();
      $$unsubscribe_bannerActive();
      $$unsubscribe_bannerList();
      $$unsubscribe_page();
      $$unsubscribe_mobileMode();
      $$unsubscribe_viewportHeight();
      return `


${$$result.head += `<meta property="${"twitter:url"}"${add_attribute("content", HOST, 0)} data-svelte="svelte-15qc3g3"><meta name="${"keywords"}"${add_attribute("content", KEYWORDS, 0)} data-svelte="svelte-15qc3g3"><meta name="${"description"}"${add_attribute("content", DESCRIPTION, 0)} data-svelte="svelte-15qc3g3"><meta property="${"og:description"}"${add_attribute("content", DESCRIPTION, 0)} data-svelte="svelte-15qc3g3"><meta property="${"og:url"}"${add_attribute("content", HOST, 0)} data-svelte="svelte-15qc3g3"><meta property="${"twitter:description"}"${add_attribute("content", DESCRIPTION, 0)} data-svelte="svelte-15qc3g3"><meta property="${"al:web:url"}"${add_attribute("content", HOST, 0)} data-svelte="svelte-15qc3g3">${validate_component(Iklan, "Ads").$$render($$result, { head: true }, {}, {})}`, ""}

${!preview ? `${validate_component(Disclaimer, "Disclaimer").$$render($$result, {}, {}, {})}` : ``}

<main style="${"height: " + escape($viewportHeight ? `${$viewportHeight}px` : "100vh")}" class="${[
        "svelte-1537kly",
        ($mobileMode ? "mobile" : "") + " " + (preview ? "preview" : "")
      ].join(" ").trim()}">${slots.default ? slots.default({}) : ``}
	<a href="${"/"}" class="${"uid svelte-1537kly"}" title="${"Try Your Luck by this Simulator"}"></a>

	<img src="${"/assets/images/utility/genshin-logo.webp"}" alt="${"genshin logo"}" class="${"logo svelte-1537kly"}">
</main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css3,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css3;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-f65cfd9f.js";
    js = ["pages/__layout.svelte-f65cfd9f.js", "chunks/index-597d8f7f.js", "chunks/env-d340a8de.js", "chunks/index-d2dd467b.js", "chunks/Iklan-f226e84d.js", "chunks/audio-f06c0dfa.js"];
    css3 = ["assets/pages/__layout.svelte-8cf77f76.css", "assets/Iklan-d234f68e.css"];
  }
});

// .svelte-kit/output/server/entries/pages/__error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => _error,
  load: () => load
});
function load({ error: error2, status }) {
  return {
    props: {
      statusCode: status,
      message: error2.message
    }
  };
}
var css4, _error;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__error.svelte.js"() {
    init_index_437e72a6();
    css4 = {
      code: "section.svelte-ky8fkm.svelte-ky8fkm{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center}.bg.svelte-ky8fkm.svelte-ky8fkm{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:110%;height:110%;object-fit:cover;filter:blur(5px)}.container.svelte-ky8fkm.svelte-ky8fkm{position:relative;z-index:+1;width:80%;height:70%;background-color:#ece6de;padding:2rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}.gi-primo-star.svelte-ky8fkm.svelte-ky8fkm{color:#fdf0ac;font-size:1.5rem;display:inline-block;position:absolute;filter:drop-shadow(0 0 7px rgba(227, 149, 48, 0.9))}.top-left.svelte-ky8fkm.svelte-ky8fkm{top:-0.8rem;left:-0.5rem;transform:rotate(-45deg)}.top-right.svelte-ky8fkm.svelte-ky8fkm{top:-0.8rem;right:-0.5rem;transform:rotate(45deg)}.bottom-left.svelte-ky8fkm.svelte-ky8fkm{bottom:-0.8rem;left:-0.5rem;transform:rotate(-135deg)}.bottom-right.svelte-ky8fkm.svelte-ky8fkm{bottom:-0.8rem;right:-0.5rem;transform:rotate(135deg)}.icon-bg.svelte-ky8fkm.svelte-ky8fkm{font-size:17em;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);color:#e4dcce;z-index:-1}h1.svelte-ky8fkm.svelte-ky8fkm{font-size:2.5rem}h2.svelte-ky8fkm.svelte-ky8fkm{font-size:1.2rem;padding:0.6rem 0}p.svelte-ky8fkm.svelte-ky8fkm{font-size:1rem}a.svelte-ky8fkm.svelte-ky8fkm{border-radius:40px;color:white;background-color:#4a5265;display:inline-flex;align-items:center;justify-content:space-between;padding:5px 4rem 5px 5px;transition:all 0.2s;margin-top:3rem}a.svelte-ky8fkm i.svelte-ky8fkm{width:2rem;height:2rem;background-color:#353533;border-radius:100%;display:inline-flex;justify-content:center;align-items:center;font-size:1rem;margin-right:3rem;color:#ffc107}a.svelte-ky8fkm.svelte-ky8fkm:hover{background-color:rgb(51, 57, 71)}",
      map: null
    };
    _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { statusCode } = $$props;
      let { message } = $$props;
      const random = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      if ($$props.statusCode === void 0 && $$bindings.statusCode && statusCode !== void 0)
        $$bindings.statusCode(statusCode);
      if ($$props.message === void 0 && $$bindings.message && message !== void 0)
        $$bindings.message(message);
      $$result.css.add(css4);
      return `${$$result.head += `${$$result.title = `<title>Error ${escape(statusCode)}</title>`, ""}`, ""}

<section class="${"svelte-ky8fkm"}"><img class="${"bg svelte-ky8fkm"}" src="${"/assets/images/background/bg" + escape(random(1, 16)) + ".webp"}" alt="${"background"}">
	<div class="${"container svelte-ky8fkm"}"><i class="${"gi-primo-star top-left svelte-ky8fkm"}"></i>
		<i class="${"gi-primo-star top-right svelte-ky8fkm"}"></i>
		<i class="${"gi-primo-star bottom-left svelte-ky8fkm"}"></i>
		<i class="${"gi-primo-star bottom-right svelte-ky8fkm"}"></i>
		<i class="${"gi-inazuma icon-bg svelte-ky8fkm"}"></i>
		<h1 class="${"svelte-ky8fkm"}">Error ${escape(statusCode)}</h1>
		<h2 class="${"svelte-ky8fkm"}">${escape(message)}</h2>
		<p class="${"svelte-ky8fkm"}">We find some problem with the page you&#39;re looking for ..</p>
		<a href="${"/"}" class="${"svelte-ky8fkm"}"><i class="${"gi-reply svelte-ky8fkm"}"></i> Back To The Beginning .. </a></div>
</section>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css5,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css5;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "pages/__error.svelte-3cbfad69.js";
    js2 = ["pages/__error.svelte-3cbfad69.js", "chunks/index-597d8f7f.js"];
    css5 = ["assets/pages/__error.svelte-8c0ed91a.css"];
  }
});

// .svelte-kit/vercel-tmp/entry.js
var entry_exports = {};
__export(entry_exports, {
  default: () => entry_default
});
module.exports = __toCommonJS(entry_exports);

// .svelte-kit/vercel-tmp/shims.js
init_install_fetch();
installFetch();

// node_modules/@sveltejs/kit/dist/node.js
var import_stream = require("stream");
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length2 = Number(h2["content-length"]);
    if (isNaN(length2) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data2 = new Uint8Array(length2 || 0);
    if (length2 > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length2) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data2.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data2.length + chunk.length);
        new_data.set(data2, 0);
        new_data.set(chunk, data2.length);
        data2 = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data2);
    });
  });
}
async function getRequest(base2, req) {
  let headers = req.headers;
  if (req.httpVersionMajor === 2) {
    headers = Object.assign({}, headers);
    delete headers[":method"];
    delete headers[":path"];
    delete headers[":authority"];
    delete headers[":scheme"];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers,
    body: await get_raw_body(req)
  });
}
async function setResponse(res, response) {
  const headers = Object.fromEntries(response.headers);
  if (response.headers.has("set-cookie")) {
    headers["set-cookie"] = response.headers.raw()["set-cookie"];
  }
  res.writeHead(response.status, headers);
  if (response.body instanceof import_stream.Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(await response.arrayBuffer());
    }
    res.end();
  }
}

// .svelte-kit/output/server/index.js
init_index_437e72a6();
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _use_hashes;
var _dev;
var _script_needs_csp;
var _style_needs_csp;
var _directives;
var _script_src;
var _style_src;
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page2);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      } else {
        headers.set(key2, value);
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && typeof body.pipe === "function")
      return false;
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function normalize_request_method(event) {
  const method = event.request.method.toLowerCase();
  return method === "delete" ? "del" : method;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const method = normalize_request_method(event);
  let handler = mod[method];
  if (!handler && method === "head") {
    handler = mod.get;
  }
  if (!handler) {
    const allowed = [];
    for (const method2 in ["get", "post", "put", "patch"]) {
      if (mod[method2])
        allowed.push(method2.toUpperCase());
    }
    if (mod.del)
      allowed.push("DELETE");
    if (mod.get || mod.head)
      allowed.push("HEAD");
    return event.request.headers.get("x-sveltekit-load") ? new Response(void 0, {
      status: 204
    }) : new Response(`${event.request.method} method not allowed`, {
      status: 405,
      headers: {
        allow: allowed.join(", ")
      }
    });
  }
  const response = await handler(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  const { status = 200, body = {} } = response;
  const headers = response.headers instanceof Headers ? new Headers(response.headers) : to_headers(response.headers);
  const type = headers.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers.has("etag")) {
    const cache_control = headers.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== "head" ? normalized_body : void 0, {
    status,
    headers
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry3) {
    return entry3[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry3, i2) {
    names.set(entry3[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a4) {
            var k = _a4[0], v = _a4[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop3() {
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop3) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var render_json_payload_script_dict = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var render_json_payload_script_regex = new RegExp(`[${Object.keys(render_json_payload_script_dict).join("")}]`, "g");
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(render_json_payload_script_regex, (match) => render_json_payload_script_dict[match]);
  let safe_attrs = "";
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0)
      continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(`[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`, "g");
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data2) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array = encode$1(data2);
  for (let i2 = 0; i2 < array.length; i2 += 16) {
    const w = array.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder.encode(str);
  const length2 = encoded.length * 8;
  const size = 512 * Math.ceil((length2 + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length2 / 4294967296);
  words[words.length - 1] = length2;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var generate_nonce;
var generate_hash;
if (typeof crypto !== "undefined") {
  const array = new Uint8Array(16);
  generate_nonce = () => {
    crypto.getRandomValues(array);
    return base64(array);
  };
  generate_hash = sha256;
} else {
  const name = "crypto";
  csp_ready = import(name).then((crypto2) => {
    generate_nonce = () => {
      return crypto2.randomBytes(16).toString("base64");
    };
    generate_hash = (input) => {
      return crypto2.createHash("sha256").update(input, "utf-8").digest().toString("base64");
    };
  });
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    __privateAdd2(this, _use_hashes, void 0);
    __privateAdd2(this, _dev, void 0);
    __privateAdd2(this, _script_needs_csp, void 0);
    __privateAdd2(this, _style_needs_csp, void 0);
    __privateAdd2(this, _directives, void 0);
    __privateAdd2(this, _script_src, void 0);
    __privateAdd2(this, _style_src, void 0);
    __privateSet2(this, _use_hashes, mode === "hash" || mode === "auto" && prerender);
    __privateSet2(this, _directives, dev ? __spreadValues({}, directives) : directives);
    __privateSet2(this, _dev, dev);
    const d = __privateGet2(this, _directives);
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    __privateSet2(this, _script_src, []);
    __privateSet2(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet2(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet2(this, _style_needs_csp, !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet2(this, _script_needs_csp) && !__privateGet2(this, _use_hashes);
    this.style_needs_nonce = __privateGet2(this, _style_needs_csp) && !__privateGet2(this, _use_hashes);
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (__privateGet2(this, _script_needs_csp)) {
      if (__privateGet2(this, _use_hashes)) {
        __privateGet2(this, _script_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet2(this, _script_src).length === 0) {
        __privateGet2(this, _script_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet2(this, _style_needs_csp)) {
      if (__privateGet2(this, _use_hashes)) {
        __privateGet2(this, _style_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet2(this, _style_src).length === 0) {
        __privateGet2(this, _style_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = __spreadValues({}, __privateGet2(this, _directives));
    if (__privateGet2(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet2(this, _style_src)
      ];
    }
    if (__privateGet2(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet2(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
_use_hashes = /* @__PURE__ */ new WeakMap();
_dev = /* @__PURE__ */ new WeakMap();
_script_needs_csp = /* @__PURE__ */ new WeakMap();
_style_needs_csp = /* @__PURE__ */ new WeakMap();
_directives = /* @__PURE__ */ new WeakMap();
_script_src = /* @__PURE__ */ new WeakMap();
_style_src = /* @__PURE__ */ new WeakMap();
var updated = __spreadProps(__spreadValues({}, readable(false)), {
  check: () => false
});
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  stuff
}) {
  if (state.prerender) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %svelte.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => stylesheets.add(url));
      if (node.js)
        node.js.forEach((url) => modulepreloads.add(url));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: __spreadProps(__spreadValues({}, session), {
          subscribe: (fn) => {
            is_private = true;
            return session.subscribe(fn);
          }
        }),
        updated
      },
      page: {
        error: error2,
        params: event.params,
        routeId: event.routeId,
        status,
        stuff,
        url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    rendered = options.root.render(props);
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerender,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [
					${(branch || []).map(({ node }) => `import(${s2(options.prefix + node.entry)})`).join(",\n						")}
				],
				params: ${devalue(event.params)},
				routeId: ${s2(event.routeId)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('${options.service_worker}');
		}
	`;
  if (options.amp) {
    const styles2 = `${inlined_style}
${rendered.css.code}`;
    head += `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>

		<style amp-custom>${styles2}</style>`;
    if (options.service_worker) {
      head += '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>';
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    if (inlined_style) {
      const attributes = [];
      if (options.dev)
        attributes.push(" data-sveltekit");
      if (csp.style_needs_nonce)
        attributes.push(` nonce="${csp.nonce}"`);
      csp.add_style(inlined_style);
      head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
    }
    head += Array.from(stylesheets).map((dep) => {
      const attributes = [
        'rel="stylesheet"',
        `href="${options.prefix + dep}"`
      ];
      if (csp.style_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      if (styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      }
      return `
	<link ${attributes.join(" ")}>`;
    }).join("");
    if (page_config.router || page_config.hydrate) {
      head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
      const attributes = ['type="module"', `data-hydrate="${target}"`];
      csp.add_script(init_app);
      if (csp.script_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
      body += serialized_data.map(({ url, body: body2, response }) => render_json_payload_script({ type: "data", url, body: typeof body2 === "string" ? hash(body2) : void 0 }, response)).join("\n	");
      if (shadow_props) {
        body += render_json_payload_script({ type: "props" }, shadow_props);
      }
    }
    if (options.service_worker) {
      csp.add_script(init_service_worker);
      head += `
				<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
    }
  }
  if (state.prerender && !options.amp) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (maxage) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = await resolve_opts.transformPage({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce })
  });
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (maxage) {
    headers.set("cache-control", `${is_private ? "private" : "public"}, max-age=${maxage}`);
  }
  if (!options.floc) {
    headers.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerender) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
function try_serialize(data2, fail) {
  try {
    return devalue(data2);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index, eqIdx).trim();
    if (obj[key2] === void 0) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e2) {
    return str;
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e2);
  }
  var cookie2 = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie2.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie2.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie2.secure = true;
    } else if (key2 === "httponly") {
      cookie2.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie2.sameSite = value2;
    } else {
      cookie2[key2] = value2;
    }
  });
  return cookie2;
}
function parse(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie2 = parseString(str, options);
      cookies2[cookie2.name] = cookie2;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return { status: status || 500, error: new Error() };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.dependencies) {
    if (!Array.isArray(loaded.dependencies) || loaded.dependencies.some((dep) => typeof dep !== "string")) {
      return {
        status: 500,
        error: new Error('"dependencies" property returned from load() must be of type string[]')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && /\/[^./]+$/.test(path)) {
    return path + "/";
  }
  return path;
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
async function load_node({
  event,
  options,
  state,
  route,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  const cookies = parse_1(event.request.headers.get("cookie") || "");
  const new_cookies = [];
  let loaded;
  const shadow = is_leaf ? await load_shadow_data(route, event, options, !!state.prerender) : {};
  if (shadow.cookies) {
    shadow.cookies.forEach((header) => {
      new_cookies.push(parseString_1(header));
    });
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module2.load) {
    const load_input = {
      url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url,
      params: event.params,
      props: shadow.body || {},
      routeId: event.routeId,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${event.url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const authorization = event.request.headers.get("authorization");
            const combined_cookies = __spreadValues({}, cookies);
            for (const cookie22 of new_cookies) {
              if (!domain_matches(event.url.hostname, cookie22.domain))
                continue;
              if (!path_matches(resolved, cookie22.path))
                continue;
              combined_cookies[cookie22.name] = cookie22.value;
            }
            const cookie2 = Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
            if (cookie2) {
              opts.headers.set("cookie", cookie2);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, __spreadProps(__spreadValues({}, opts), { credentials: void 0 })), options, __spreadProps(__spreadValues({}, state), {
            initiator: route
          }));
          if (state.prerender) {
            dependency = { response, body: null };
            state.prerender.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            requested = event.url.protocol + requested;
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie2 = event.request.headers.get("cookie");
            if (cookie2)
              opts.headers.set("cookie", cookie2);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          new_cookies.push(...splitCookiesString_1(set_cookie).map((str) => parseString_1(str)));
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 !== "set-cookie" && key3 !== "etag") {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                const status_number = Number(response2.status);
                if (isNaN(status_number)) {
                  throw new Error(`response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`);
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  response: {
                    status: status_number,
                    statusText: response2.statusText,
                    headers,
                    body
                  }
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: __spreadValues({}, stuff),
      status: is_error ? status ?? null : null,
      error: is_error ? error2 ?? null : null
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
    if (loaded.fallthrough) {
      throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (shadow.body && state.prerender) {
    const pathname = `${event.url.pathname.replace(/\/$/, "")}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerender.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers: new_cookies.map((new_cookie) => {
      const _a4 = new_cookie, { name, value } = _a4, options2 = __objRest(_a4, ["name", "value"]);
      return serialize_1(name, value, options2);
    }),
    uses_credentials
  };
}
async function load_shadow_data(route, event, options, prerender) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have endpoints with mutative methods");
    }
    const method = normalize_request_method(event);
    const is_get = method === "head" || method === "get";
    const handler = method === "head" ? mod.head || mod.get : mod[method];
    if (!handler && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data2 = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (!is_get) {
      const result = await handler(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      data2.status = status;
      add_cookies(data2.cookies, headers);
      if (status >= 300 && status < 400) {
        data2.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data2;
      }
      data2.body = body;
    }
    const get = method === "head" && mod.head || mod.get;
    if (get) {
      const result = await get(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      add_cookies(data2.cookies, headers);
      data2.status = status;
      if (status >= 400) {
        data2.error = new Error("Failed to load data");
        return data2;
      }
      if (status >= 300) {
        data2.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data2;
      }
      data2.body = __spreadValues(__spreadValues({}, body), data2.body);
    }
    return data2;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    return {
      status: 500,
      error: error2
    };
  }
}
function add_cookies(target, headers) {
  const cookies = headers["set-cookie"];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body = {} } = result;
  let headers = result.headers || {};
  if (headers instanceof Headers) {
    if (headers.has("set-cookie")) {
      throw new Error("Endpoint request handler cannot use Headers interface with Set-Cookie headers");
    }
  } else {
    headers = lowercase_keys(headers);
  }
  if (!is_pojo(body)) {
    throw new Error("Body returned from endpoint request handler must be a plain object");
  }
  return { status, headers, body };
}
async function respond_with_error({
  event,
  options,
  state,
  $session,
  status,
  error: error2,
  resolve_opts
}) {
  try {
    const branch = [];
    let stuff = {};
    if (resolve_opts.ssr) {
      const default_layout = await options.manifest._.nodes[0]();
      const default_error = await options.manifest._.nodes[1]();
      const layout_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_layout,
        $session,
        stuff: {},
        is_error: false,
        is_leaf: false
      });
      const error_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_error,
        $session,
        stuff: layout_loaded ? layout_loaded.stuff : {},
        is_error: true,
        is_leaf: false,
        status,
        error: error2
      });
      branch.push(layout_loaded, error_loaded);
      stuff = error_loaded.stuff;
    }
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff,
      status,
      error: error2,
      branch,
      event,
      resolve_opts
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response(__spreadProps(__spreadValues({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      error: null,
      event,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (state.prerender) {
    const should_prerender = leaf.prerender ?? state.prerender.default;
    if (!should_prerender) {
      return new Response(void 0, {
        status: 204
      });
    }
  }
  let branch = [];
  let status = 200;
  let error2 = null;
  let set_cookie_headers = [];
  let stuff = {};
  ssr:
    if (resolve_opts.ssr) {
      for (let i2 = 0; i2 < nodes.length; i2 += 1) {
        const node = nodes[i2];
        let loaded;
        if (node) {
          try {
            loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
              node,
              stuff,
              is_error: false,
              is_leaf: i2 === nodes.length - 1
            }));
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies(new Response(void 0, {
                status: loaded.loaded.status,
                headers: {
                  location: loaded.loaded.redirect
                }
              }), set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e2 = coalesce_to_error(err);
            options.handle_error(e2, event);
            status = 500;
            error2 = e2;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i2--) {
              if (route.b[i2]) {
                const index = route.b[i2];
                const error_node = await options.manifest._.nodes[index]();
                let node_loaded;
                let j = i2;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
                    node: error_node,
                    stuff: node_loaded.stuff,
                    is_error: true,
                    is_leaf: false,
                    status,
                    error: error2
                  }));
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  stuff = __spreadValues(__spreadValues({}, node_loaded.stuff), error_loaded.stuff);
                  break ssr;
                } catch (err) {
                  const e2 = coalesce_to_error(err);
                  options.handle_error(e2, event);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              event,
              options,
              state,
              $session,
              status,
              error: error2,
              resolve_opts
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
        }
      }
    }
  try {
    return with_cookies(await render_response(__spreadProps(__spreadValues({}, opts), {
      stuff,
      event,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error(__spreadProps(__spreadValues({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  return respond$1({
    event,
    options,
    state,
    $session,
    resolve_opts,
    route
  });
}
function negotiate(accept, types2) {
  const parts = accept.split(",").map((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      return { type, subtype, q: +q, i: i2 };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function exec(match, names, types2, matchers) {
  const params = {};
  for (let i2 = 0; i2 < names.length; i2 += 1) {
    const name = names[i2];
    const type = types2[i2];
    const value = match[i2 + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request, options, state) {
  var _a4, _b, _c;
  let url = new URL(request.url);
  const normalized = normalize_path(url.pathname, options.trailing_slash);
  if (normalized !== url.pathname && !((_a4 = state.prerender) == null ? void 0 : _a4.fallback)) {
    return new Response(void 0, {
      status: 301,
      headers: {
        location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
      }
    });
  }
  const { parameter, allowed } = options.method_override;
  const method_override = (_b = url.searchParams.get(parameter)) == null ? void 0 : _b.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  let decoded = decodeURI(url.pathname);
  let route = null;
  let params = {};
  if (options.paths.base && !((_c = state.prerender) == null ? void 0 : _c.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response(void 0, { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    decoded = decoded.slice(0, -DATA_SUFFIX.length) || "/";
    const normalized2 = normalize_path(url.pathname.slice(0, -DATA_SUFFIX.length), options.trailing_slash);
    url = new URL(url.origin + normalized2 + url.search);
  }
  if (!state.prerender || !state.prerender.fallback) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  const event = {
    get clientAddress() {
      if (!state.getClientAddress) {
        throw new Error(`${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`);
      }
      Object.defineProperty(event, "clientAddress", {
        value: state.getClientAddress()
      });
      return event.clientAddress;
    },
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform
  };
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform
          };
        }
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            event: event2,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            error: null,
            branch: [],
            resolve_opts: __spreadProps(__spreadValues({}, resolve_opts), {
              ssr: false
            })
          });
        }
        if (route) {
          let response2;
          if (is_data_request && route.type === "page" && route.shadow) {
            response2 = await render_endpoint(event2, await route.shadow());
            if (request.headers.has("x-sveltekit-load")) {
              if (response2.status >= 300 && response2.status < 400) {
                const location = response2.headers.get("location");
                if (location) {
                  const headers = new Headers(response2.headers);
                  headers.set("x-sveltekit-location", location);
                  response2 = new Response(void 0, {
                    status: 204,
                    headers
                  });
                }
              }
            }
          } else {
            response2 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, resolve_opts);
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            resolve_opts
          });
        }
        if (state.prerender) {
          return new Response("not found", { status: 404 });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        resolve_opts
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<meta\n			name="viewport"\n			content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no"\n		/>\n		<meta name="a.validate.02" content="gc8Hcbkq-w-3WEWF_q38cMwWsDdHhE5icT8F" />\n		<meta name="exoclick-site-verification" content="7bf76abca1eb5f5c5dac25be475c4803" />\n		<meta name="google-site-verification" content="zn73VlG6JLf_oG3P8jQVbKGlDkQ9s6JcR6qZLzT2tVI" />\n\n		<meta property="profile:username" content="Mantan" />\n		<meta property="og:type" content="profile" />\n		<meta property="twitter:card" content="summary_large_image" />\n		<meta name="robots" content="index, follow" />\n		<meta name="language" content="English, Indonesian" />\n		<meta name="author" content="Mantan" />\n\n		<link rel="stylesheet" href="/icons.css" />\n		<link rel="icon" href="/favicon.ico" />\n		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />\n		<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />\n		<meta name="msapplication-TileColor" content="#da532c" />\n		<meta name="theme-color" content="#ffffff" />\n		<meta name="color-scheme" content="light dark" />\n		<link rel="manifest" href="/manifest.json" />\n\n		' + head + `

		<!-- AD -->
		<script
			async
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1874822310102113"
			crossorigin="anonymous"
		><\/script>

		<script type="text/javascript" src="https://wap4dollar.com/ad/pops/?id=jnf1abpn5a"><\/script>
		<!-- AD -->

		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-211756322-1"><\/script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', 'UA-211756322-1');
		<\/script>
	</head>
	<body>
		<div id="svelte" class="svelte">` + body + "</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      amp: false,
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        this.options.hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    if (!this.options.hooks) {
      const module2 = await Promise.resolve().then(() => (init_hooks_5b953b47(), hooks_5b953b47_exports));
      this.options.hooks = {
        getSession: module2.getSession || (() => ({})),
        handle: module2.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
        handleError: module2.handleError || (({ error: error2 }) => console.error(error2.stack)),
        externalFetch: module2.externalFetch || fetch
      };
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["apple-touch-icon.png", "assets/fonts/genshin-icon.eot", "assets/fonts/genshin-icon.svg", "assets/fonts/genshin-icon.ttf", "assets/fonts/genshin-icon.woff", "assets/fonts/optimized-genshin-font.woff", "assets/images/background/bg1.webp", "assets/images/background/bg10.webp", "assets/images/background/bg11.webp", "assets/images/background/bg12.webp", "assets/images/background/bg13.webp", "assets/images/background/bg14.webp", "assets/images/background/bg15.webp", "assets/images/background/bg16.webp", "assets/images/background/bg2.webp", "assets/images/background/bg3.webp", "assets/images/background/bg4.webp", "assets/images/background/bg5.webp", "assets/images/background/bg6.webp", "assets/images/background/bg7.webp", "assets/images/background/bg8.webp", "assets/images/background/bg9.webp", "assets/images/background/constellation.webp", "assets/images/background/detailbg.webp", "assets/images/background/element-anemo-bg.webp", "assets/images/background/element-cryo-bg.webp", "assets/images/background/element-dendro-bg.webp", "assets/images/background/element-electro-bg.webp", "assets/images/background/element-geo-bg.webp", "assets/images/background/element-hydro-bg.webp", "assets/images/background/element-pyro-bg.webp", "assets/images/background/splash-background.webp", "assets/images/background/wish-background.webp", "assets/images/banner/1.0/ballad-in-goblets-1.webp", "assets/images/banner/1.0/epitome-invocation-1.webp", "assets/images/banner/1.0/epitome-invocation-2.webp", "assets/images/banner/1.0/sparkling-steps-1.webp", "assets/images/banner/1.1/epitome-invocation-3.webp", "assets/images/banner/1.1/epitome-invocation-4.webp", "assets/images/banner/1.1/farewell-of-snezhnaya-1.webp", "assets/images/banner/1.1/gentry-of-hermitage-1.webp", "assets/images/banner/1.2/adrift-in-the-harbor-1.webp", "assets/images/banner/1.2/epitome-invocation-5.webp", "assets/images/banner/1.2/epitome-invocation-6.webp", "assets/images/banner/1.2/secretum-secretorum-1.webp", "assets/images/banner/1.3/dance-of-lantern-1.webp", "assets/images/banner/1.3/epitome-invocation-7.webp", "assets/images/banner/1.3/epitome-invocation-8.webp", "assets/images/banner/1.3/invitation-to-mundane-life-1.webp", "assets/images/banner/1.3/moment-of-bloom-1.webp", "assets/images/banner/1.4/ballad-in-goblet-2.webp", "assets/images/banner/1.4/epitome-invocation-10.webp", "assets/images/banner/1.4/epitome-invocation-9.webp", "assets/images/banner/1.4/farewell-of-snezhnaya-2.webp", "assets/images/banner/1.5/born-of-ocean-swell-1.webp", "assets/images/banner/1.5/epitome-invocation-11.webp", "assets/images/banner/1.5/epitome-invocation-12.webp", "assets/images/banner/1.5/gentry-of-hermitage-2.webp", "assets/images/banner/1.6/epitome-invocation-13.webp", "assets/images/banner/1.6/epitome-invocation-14.webp", "assets/images/banner/1.6/leaves-in-the-wind-1.webp", "assets/images/banner/1.6/sparkling-steps-2.webp", "assets/images/banner/2.0/epitome-invocation-15.webp", "assets/images/banner/2.0/epitome-invocation-16.webp", "assets/images/banner/2.0/tapestry-of-golden-flames-1.webp", "assets/images/banner/2.0/the-heron_s-court-2.webp", "assets/images/banner/2.1/drifting-luminescence-1.webp", "assets/images/banner/2.1/epitome-invocation-17.webp", "assets/images/banner/2.1/epitome-invocation-18.webp", "assets/images/banner/2.1/reign-of-serenity-1.webp", "assets/images/banner/2.2/epitome-invocation-19.webp", "assets/images/banner/2.2/epitome-invocation-20.webp", "assets/images/banner/2.2/farewell-of-snezhnaya-3.webp", "assets/images/banner/2.2/moment-of-bloom-2.webp", "assets/images/banner/2.3/born-of-ocean-swell-2.webp", "assets/images/banner/2.3/epitome-invocation-21.webp", "assets/images/banner/2.3/epitome-invocation-22.webp", "assets/images/banner/2.3/oni_s-royale-1.webp", "assets/images/banner/2.3/secretum-secretorum-2.webp", "assets/images/banner/2.4/adrift-in-the-harbor-2.webp", "assets/images/banner/2.4/epitome-invocation-23.webp", "assets/images/banner/2.4/epitome-invocation-24.webp", "assets/images/banner/2.4/gentry-of-hermitage-3.webp", "assets/images/banner/2.4/invitation-to-mundane-life-2.webp", "assets/images/banner/2.4/the-transcendent-one-returns-1.webp", "assets/images/banner/2.5/drifting-luminescence-2.webp", "assets/images/banner/2.5/epitome-invocation-25.webp", "assets/images/banner/2.5/epitome-invocation-26.webp", "assets/images/banner/2.5/everbloom-violet-1.webp", "assets/images/banner/2.5/reign-of-serenity-2.webp", "assets/images/banner/2.6/azure-excursion-1.webp", "assets/images/banner/2.6/ballad-in-goblets-3.webp", "assets/images/banner/2.6/epitome-invocation-27.webp", "assets/images/banner/2.6/epitome-invocation-28.webp", "assets/images/banner/2.6/the-heron_s-court-2.webp", "assets/images/banner/2.7/discerner-of-enigmas-1.webp", "assets/images/banner/2.7/epitome-invocation-29.webp", "assets/images/banner/2.7/invitation-to-mundane-life-3.webp", "assets/images/banner/beginner.webp", "assets/images/banner/standard/wanderlust-invocation-1.webp", "assets/images/banner/standard/wanderlust-invocation-2.webp", "assets/images/characters/banner-button/albedo.webp", "assets/images/characters/banner-button/arataki-itto.webp", "assets/images/characters/banner-button/eula.webp", "assets/images/characters/banner-button/ganyu.webp", "assets/images/characters/banner-button/hu-tao.webp", "assets/images/characters/banner-button/jean.webp", "assets/images/characters/banner-button/kaedehara-kazuha.webp", "assets/images/characters/banner-button/kamisato-ayaka.webp", "assets/images/characters/banner-button/kamisato-ayato.webp", "assets/images/characters/banner-button/keqing.webp", "assets/images/characters/banner-button/klee.webp", "assets/images/characters/banner-button/noelle.webp", "assets/images/characters/banner-button/qiqi.webp", "assets/images/characters/banner-button/raiden-shogun.webp", "assets/images/characters/banner-button/sagonomiya-kokomi.webp", "assets/images/characters/banner-button/shenhe.webp", "assets/images/characters/banner-button/tartaglia.webp", "assets/images/characters/banner-button/venti.webp", "assets/images/characters/banner-button/xiao.webp", "assets/images/characters/banner-button/yae-miko.webp", "assets/images/characters/banner-button/yelan.webp", "assets/images/characters/banner-button/yoimiya.webp", "assets/images/characters/banner-button/zhongli.webp", "assets/images/characters/profile/albedo.webp", "assets/images/characters/profile/amber.webp", "assets/images/characters/profile/arataki-itto.webp", "assets/images/characters/profile/barbara.webp", "assets/images/characters/profile/beidou.webp", "assets/images/characters/profile/bennett.webp", "assets/images/characters/profile/chongyun.webp", "assets/images/characters/profile/diluc.webp", "assets/images/characters/profile/diona.webp", "assets/images/characters/profile/eula.webp", "assets/images/characters/profile/fischl.webp", "assets/images/characters/profile/ganyu.webp", "assets/images/characters/profile/gorou.webp", "assets/images/characters/profile/hu-tao.webp", "assets/images/characters/profile/jean.webp", "assets/images/characters/profile/kaedehara-kazuha.webp", "assets/images/characters/profile/kaeya.webp", "assets/images/characters/profile/kamisato-ayaka.webp", "assets/images/characters/profile/kamisato-ayato.webp", "assets/images/characters/profile/keqing.webp", "assets/images/characters/profile/klee.webp", "assets/images/characters/profile/kujou-sara.webp", "assets/images/characters/profile/lisa.webp", "assets/images/characters/profile/mona.webp", "assets/images/characters/profile/ningguang.webp", "assets/images/characters/profile/noelle.webp", "assets/images/characters/profile/qiqi.webp", "assets/images/characters/profile/raiden-shogun.webp", "assets/images/characters/profile/razor.webp", "assets/images/characters/profile/rosaria.webp", "assets/images/characters/profile/sagonomiya-kokomi.webp", "assets/images/characters/profile/sayu.webp", "assets/images/characters/profile/shenhe.webp", "assets/images/characters/profile/sucrose.webp", "assets/images/characters/profile/tartaglia.webp", "assets/images/characters/profile/thoma.webp", "assets/images/characters/profile/venti.webp", "assets/images/characters/profile/xiangling.webp", "assets/images/characters/profile/xiao.webp", "assets/images/characters/profile/xingqiu.webp", "assets/images/characters/profile/xinyan.webp", "assets/images/characters/profile/yae-miko.webp", "assets/images/characters/profile/yanfei.webp", "assets/images/characters/profile/yelan.webp", "assets/images/characters/profile/yoimiya.webp", "assets/images/characters/profile/yun-jin.webp", "assets/images/characters/profile/zhongli.webp", "assets/images/characters/splash-art/4star/amber.webp", "assets/images/characters/splash-art/4star/barbara.webp", "assets/images/characters/splash-art/4star/beidou.webp", "assets/images/characters/splash-art/4star/bennett.webp", "assets/images/characters/splash-art/4star/chongyun.webp", "assets/images/characters/splash-art/4star/diona.webp", "assets/images/characters/splash-art/4star/fischl.webp", "assets/images/characters/splash-art/4star/gorou.webp", "assets/images/characters/splash-art/4star/kaeya.webp", "assets/images/characters/splash-art/4star/kujou-sara.webp", "assets/images/characters/splash-art/4star/lisa.webp", "assets/images/characters/splash-art/4star/ningguang.webp", "assets/images/characters/splash-art/4star/noelle.webp", "assets/images/characters/splash-art/4star/razor.webp", "assets/images/characters/splash-art/4star/rosaria.webp", "assets/images/characters/splash-art/4star/sayu.webp", "assets/images/characters/splash-art/4star/sucrose.webp", "assets/images/characters/splash-art/4star/thoma.webp", "assets/images/characters/splash-art/4star/xiangling.webp", "assets/images/characters/splash-art/4star/xingqiu.webp", "assets/images/characters/splash-art/4star/xinyan.webp", "assets/images/characters/splash-art/4star/yanfei.webp", "assets/images/characters/splash-art/4star/yun-jin.webp", "assets/images/characters/splash-art/5star/albedo.webp", "assets/images/characters/splash-art/5star/arataki-itto.webp", "assets/images/characters/splash-art/5star/diluc.webp", "assets/images/characters/splash-art/5star/eula.webp", "assets/images/characters/splash-art/5star/ganyu.webp", "assets/images/characters/splash-art/5star/hu-tao.webp", "assets/images/characters/splash-art/5star/jean.webp", "assets/images/characters/splash-art/5star/kaedehara-kazuha.webp", "assets/images/characters/splash-art/5star/kamisato-ayaka.webp", "assets/images/characters/splash-art/5star/kamisato-ayato.webp", "assets/images/characters/splash-art/5star/keqing.webp", "assets/images/characters/splash-art/5star/klee.webp", "assets/images/characters/splash-art/5star/mona.webp", "assets/images/characters/splash-art/5star/qiqi.webp", "assets/images/characters/splash-art/5star/raiden-shogun.webp", "assets/images/characters/splash-art/5star/sagonomiya-kokomi.webp", "assets/images/characters/splash-art/5star/shenhe.webp", "assets/images/characters/splash-art/5star/tartaglia.webp", "assets/images/characters/splash-art/5star/venti.webp", "assets/images/characters/splash-art/5star/xiao.webp", "assets/images/characters/splash-art/5star/yae-miko.webp", "assets/images/characters/splash-art/5star/yelan.webp", "assets/images/characters/splash-art/5star/yoimiya.webp", "assets/images/characters/splash-art/5star/zhongli.webp", "assets/images/utility/3star-bg.webp", "assets/images/utility/4star-bg.webp", "assets/images/utility/5star-bg.webp", "assets/images/utility/acquaint-fate.webp", "assets/images/utility/bg-bow.webp", "assets/images/utility/bg-catalyst.webp", "assets/images/utility/bg-claymore.webp", "assets/images/utility/bg-polearm.webp", "assets/images/utility/bg-sword.webp", "assets/images/utility/bow-white.svg", "assets/images/utility/brand.svg", "assets/images/utility/button.svg", "assets/images/utility/button.webp", "assets/images/utility/catalyst-white.svg", "assets/images/utility/claymore-white.svg", "assets/images/utility/cursor.png", "assets/images/utility/donate-bnb.png", "assets/images/utility/donate-btc.png", "assets/images/utility/donate-dana.png", "assets/images/utility/donate-ethereum.png", "assets/images/utility/donate-gopay.png", "assets/images/utility/donate-kofi.png", "assets/images/utility/donate-linkaja.png", "assets/images/utility/donate-ovo.png", "assets/images/utility/donate-shopeepay.png", "assets/images/utility/donate-solana.png", "assets/images/utility/fatepointbook-half.webp", "assets/images/utility/fatepointbook.webp", "assets/images/utility/genesis-1980.webp", "assets/images/utility/genesis-300.webp", "assets/images/utility/genesis-3280.webp", "assets/images/utility/genesis-60.webp", "assets/images/utility/genesis-6480.webp", "assets/images/utility/genesis-980.webp", "assets/images/utility/genesis.webp", "assets/images/utility/genshin-logo.webp", "assets/images/utility/icon-anemo.svg", "assets/images/utility/icon-cryo.svg", "assets/images/utility/icon-electro.svg", "assets/images/utility/icon-geo.svg", "assets/images/utility/icon-hydro.svg", "assets/images/utility/icon-pyro.svg", "assets/images/utility/intertwined-fate.webp", "assets/images/utility/masterless-stardust.webp", "assets/images/utility/masterless-starglitter.webp", "assets/images/utility/polearm-white.svg", "assets/images/utility/primogem.webp", "assets/images/utility/splatter-3star.svg", "assets/images/utility/splatter-4star.svg", "assets/images/utility/splatter-5star.svg", "assets/images/utility/stella-fortuna-4star.webp", "assets/images/utility/stella-fortuna-5star.webp", "assets/images/utility/sword-white.svg", "assets/images/weapons/bow/3star/raven-bow.webp", "assets/images/weapons/bow/3star/sharpshooter_s-oath.webp", "assets/images/weapons/bow/3star/slingshot.webp", "assets/images/weapons/bow/4star/alley-hunter.webp", "assets/images/weapons/bow/4star/favonius-warbow.webp", "assets/images/weapons/bow/4star/mitternachts-waltz.webp", "assets/images/weapons/bow/4star/mouun_s-moon.webp", "assets/images/weapons/bow/4star/rust.webp", "assets/images/weapons/bow/4star/sacrificial-bow.webp", "assets/images/weapons/bow/4star/the-stringless.webp", "assets/images/weapons/bow/5star/amos-bow.webp", "assets/images/weapons/bow/5star/aqua-simulacra.webp", "assets/images/weapons/bow/5star/elegy-for-the-end.webp", "assets/images/weapons/bow/5star/polar-star.webp", "assets/images/weapons/bow/5star/skyward-harp.webp", "assets/images/weapons/bow/5star/thundering-pulse.webp", "assets/images/weapons/catalyst/3star/emerald-orb.webp", "assets/images/weapons/catalyst/3star/magic-guide.webp", "assets/images/weapons/catalyst/3star/thrilling-tales-of-dragon-slayers.webp", "assets/images/weapons/catalyst/4star/eye-of-perception.webp", "assets/images/weapons/catalyst/4star/favonius-codex.webp", "assets/images/weapons/catalyst/4star/sacrificial-fragments.webp", "assets/images/weapons/catalyst/4star/the-widsith.webp", "assets/images/weapons/catalyst/4star/wine-and-song.webp", "assets/images/weapons/catalyst/5star/everlasting-moonglow.webp", "assets/images/weapons/catalyst/5star/kagura_s-verity.webp", "assets/images/weapons/catalyst/5star/lost-prayer-to-the-sacred-winds.webp", "assets/images/weapons/catalyst/5star/memory-of-dust.webp", "assets/images/weapons/catalyst/5star/skyward-atlas.webp", "assets/images/weapons/claymore/3star/bloodtained-greatsword.webp", "assets/images/weapons/claymore/3star/debate-club.webp", "assets/images/weapons/claymore/3star/ferrous-shadow.webp", "assets/images/weapons/claymore/4star/akuoumaru.webp", "assets/images/weapons/claymore/4star/favonius-greatsword.webp", "assets/images/weapons/claymore/4star/lithic-blade.webp", "assets/images/weapons/claymore/4star/rainslasher.webp", "assets/images/weapons/claymore/4star/sacrificial-greatsword.webp", "assets/images/weapons/claymore/4star/the-bell.webp", "assets/images/weapons/claymore/5star/redhorn-stonethresher.webp", "assets/images/weapons/claymore/5star/skyward-pride.webp", "assets/images/weapons/claymore/5star/song-of-broken-pines.webp", "assets/images/weapons/claymore/5star/the-unforged.webp", "assets/images/weapons/claymore/5star/wolf_s-gravestone.webp", "assets/images/weapons/polearm/3star/black-tassel.webp", "assets/images/weapons/polearm/4star/dragon_s-bane.webp", "assets/images/weapons/polearm/4star/favonius-lance.webp", "assets/images/weapons/polearm/4star/lithic-spear.webp", "assets/images/weapons/polearm/4star/wavebreaker_s-fin.webp", "assets/images/weapons/polearm/5star/calamity-queller.webp", "assets/images/weapons/polearm/5star/engulfing-lightning.webp", "assets/images/weapons/polearm/5star/primordial-jade-winged-spear.webp", "assets/images/weapons/polearm/5star/skyward-spine.webp", "assets/images/weapons/polearm/5star/staff-of-homa.webp", "assets/images/weapons/polearm/5star/vortex-vanquisher.webp", "assets/images/weapons/sword/3star/cool-steel.webp", "assets/images/weapons/sword/3star/harbinger-of-dawn.webp", "assets/images/weapons/sword/3star/skyrider-sword.webp", "assets/images/weapons/sword/4star/favonius-sword.webp", "assets/images/weapons/sword/4star/lion_s-roar.webp", "assets/images/weapons/sword/4star/sacrificial-sword.webp", "assets/images/weapons/sword/4star/the-alley-flash.webp", "assets/images/weapons/sword/4star/the-flute.webp", "assets/images/weapons/sword/5star/aquila-favonia.webp", "assets/images/weapons/sword/5star/freedom-sworn.webp", "assets/images/weapons/sword/5star/haran-geppaku-futsu.webp", "assets/images/weapons/sword/5star/mistsplitter-reforged.webp", "assets/images/weapons/sword/5star/primordial-jade-cutter.webp", "assets/images/weapons/sword/5star/skyward-blade.webp", "assets/images/weapons/sword/5star/summit-shaper.webp", "assets/sfx/result-list.ogg", "assets/sfx/reveal-3star.ogg", "assets/sfx/reveal-4star.ogg", "assets/sfx/reveal-5star.ogg", "assets/sfx/wish-backsound.ogg", "assets/videos/3star-single.webm", "assets/videos/4star-single.webm", "assets/videos/4star.webm", "assets/videos/5star-single.webm", "assets/videos/5star.webm", "favicon.ico", "google77966abbed90508f.html", "icons/icon-128x128.png", "icons/icon-144x144.png", "icons/icon-152x152.png", "icons/icon-192x192.png", "icons/icon-384x384.png", "icons/icon-512x512.png", "icons/icon-72x72.png", "icons/icon-96x96.png", "icons.css", "manifest.json", "robots.txt", "safari-pinned-tab.svg", "screenshot/epitomized-path.jpg", "screenshot/inventory.jpg", "screenshot/meta-picture.jpg", "screenshot/mobile-weapon.jpg", "screenshot/switch-banner.jpg"]),
  mimeTypes: { ".png": "image/png", ".eot": "application/vnd.ms-fontobject", ".svg": "image/svg+xml", ".ttf": "font/ttf", ".woff": "font/woff", ".webp": "image/webp", ".ogg": "audio/ogg", ".webm": "video/webm", ".ico": "image/vnd.microsoft.icon", ".html": "text/html", ".css": "text/css", ".json": "application/json", ".txt": "text/plain", ".jpg": "image/jpeg" },
  _: {
    entry: { "file": "start-c671e5ce.js", "js": ["start-c671e5ce.js", "chunks/index-597d8f7f.js", "chunks/index-d2dd467b.js", "chunks/preload-helper-e4860ae8.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2))
    ],
    routes: [],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/entry.js
var server = new Server(manifest);
var entry_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await server.respond(request, {
    getClientAddress() {
      return request.headers.get("x-forwarded-for");
    }
  }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
/*!
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
/*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.13.0
 *
 * Copyright KingSora | Rene Haas.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 02.08.2020
 */
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
