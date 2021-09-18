type formType = "input" | "password" | "select" | "datepicker";

export interface optionType {
    title: string;
    value: string | number;
}

export interface formItem {
    type?: formType;
    label: string;
    rules?: any[];
    placeholder?: string;
    options?: optionType[];
    other?: any;
    field: string;
    isHidden?: boolean;
}

// info
// cols
// type

// labelWidth

// itemStyle

// colLayout:

export interface IForm {
    formItem: formItem[];
    labelWidth?: string;
    colLayout?: any;
    itemStyle?: any;
}
