export const InputField = ({
    label,
    value,
    error,
    onChange,
    type = "text",
    isReadOnly = false,
}: {
    label: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    isReadOnly?: boolean;
}) => (
    <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700" htmlFor={label}>{label}</label>
        <input
            type={type}
			value={value}
			id={label}
			placeholder={label}
            onChange={onChange}
            readOnly={isReadOnly}
            className=" p-3 mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);
