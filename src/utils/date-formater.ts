const DEFAULT = "YYYY-MM-DD HH:mm:ss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export function utcFormate(utc: string, format: string = DEFAULT) {
    return dayjs
        .utc(utc)
        .utcOffset(8)
        .format(format);
}
