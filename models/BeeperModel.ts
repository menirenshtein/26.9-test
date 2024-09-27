import BeeperStatus from '../statuses/beeperStatuses.js'

export interface Beeper{
    id: string,
    name: string,
    status:BeeperStatus ,
    createTime: Date,
    blowTime?: Date,
    xPoint?: string,
    yPoint?: string
}
