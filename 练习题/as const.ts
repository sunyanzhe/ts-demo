type Messages = 
'CHANNEL_OPEN' | 'CHANNEL_CLOSE' | 'CHANNEL_FAIL' | 
'MESSAGE_CHANNEL_OPEN' | 'MESSAGE_CHANNEL_CLOSE' |
'MESSAGE_CHANNEL_FAIL'

type DefineChannel = {
  [key: string]: {
    open: Messages,
    close: Messages,
    fail: Messages
  }
}

declare function openChannel(
  def: DefineChannel,
  key: keyof DefineChannel
): void

const impl = {
  test: {
    open: 'CHANNEL_OPEN',
    close: 'CHANNEL_CLOSE',
    fail: 'CHANNEL_FAIL'
  },
  message: {
    open: 'MESSAGE_CHANNEL_OPEN',
    close: 'MESSAGE_CHANNEL_CLOSE',
    fail: 'MESSAGE_CHANNEL_FAIL'
  }
} as const

openChannel(impl, 'a')   // pass 尽管impl没有a， 但是DefineChannel的key是string意思就是什么都可以

declare function openChannel2<T extends DefineChannel>(def: T, key: keyof T): void

openChannel2(impl, 'a') // 这样就妥了