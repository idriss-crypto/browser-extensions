import { Multiselect, MultiselectOption } from '@idriss-xyz/ui/multiselect';


interface Properties {
  value: string[];
  label?: string;
  className?: string;
  tokens: MultiselectOption<string>[];
  onChange: (value: string[]) => void;
}

export const TokenSelect = ({
  value,
  label,
  onChange,
  tokens,
  className,
}: Properties) => {


  return (
    <Multiselect<string>
      inputClassName={className}
      label={label}
      options={tokens}
      onChange={onChange}
      value={value}
    />
  );
};
