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


//   ------------------------------------------------ union to intersection ----------------------------------------------------------

type Format320 = { urls: {format320p: string}}
type Format480 = { urls: {format480p: string}}
type Format720 = { urls: {format720p: string}}
type Format1080 = { urls: {format1080p: string}}

type Video = Format1080 | Format720 | Format480 | Format320

type keys = Video['urls']

// 由于第二个条件 推断infer R处于的位置为逆变位 为了兼容性 将 ｜ 转变为了 &
type UnionToIntersection<T> = (T extends any ? (arg: T) => any : never) extends (arg: infer R) => any ? R : never

type FormatKey = keyof UnionToIntersection<Video['urls']>