import { ReminderListStatusEnum } from "../enums/reminder-list-status.enum";
import { OptionModel } from "../model/option.model";

export class EnumToKeyValueHelper {
    static getReminderListStatusEnumAsObjectList(includeEmptySelection: boolean = true) : OptionModel[] {
        const options = Object.keys(ReminderListStatusEnum).filter(key => isNaN(Number(ReminderListStatusEnum[key as unknown as number])))
        .map((key: string): OptionModel => {
            return {
                value: parseInt(key),
                text: ReminderListStatusEnum[key as unknown as number]
            };
        });
        if (includeEmptySelection) {
            options.unshift({ value: 0, text: '' });
        }
        
        return options;
    }
}