/* eslint-disable react/jsx-props-no-spreading */
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';

type Props = {
  name: string;
  label: string;
};

const MyFormField = ({ name, label }: Props) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default MyFormField;
