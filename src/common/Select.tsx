export interface OptionsData {
    value: string | number;
    name: string;
}

export interface SelectProps {
    value: string | number;
    defaultValue: string;
    options: OptionsData[]
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ options, defaultValue, onChange, value }:SelectProps) {
    return (
        <select
            value={value}
            onChange={onChange}
            className="max-w-[10rem] border rounded border-green-700"
        >
            <option disabled value={"-"}>
                {defaultValue}
            </option>
            {options.map((option) => {
                return (
                    <option value={option.value} key={option.value}>
                        {option.name}
                    </option>
                );
            })}
        </select>
    );
}
