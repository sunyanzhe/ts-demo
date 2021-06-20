declare function 
  send(data: any, headers: Record<string, string>): void

type HttpHeaders = {
  Accept: string,
  Cookie: string
}

interface HttpHeadersInterface {
  Accept: string;
  Cookie: string;
}

const hdrs: HttpHeaders = {
  Accept: 'text/html;char=utf-8',
  Cookie: ''
}

const hdrs1: HttpHeadersInterface = {
  Accept: 'text/html;char=utf-8',
  Cookie: ''
}

send({}, hdrs)
// send({}, hdrs1)      // error no signature
