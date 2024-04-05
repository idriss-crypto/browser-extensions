import { Button, ButtonProperties } from 'shared/ui/components';
import { classes } from 'shared/ui/utils';

export const ActionButton = ({
  children,
  className,
  onClick,
  type,
  loading = false,
  disabled = false,
  // TODO: pick properties to avoid leaking unused properties
}: ButtonProperties) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={classes(
        'relative w-full rounded-lg bg-[#2D9CBD] py-2.5 font-medium text-white',
        disabled && 'bg-[#2C3F4F] text-[#858D92]',
        className,
      )}
      loading={loading}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
