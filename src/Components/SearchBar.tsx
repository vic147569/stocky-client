/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';

const formSchema = z.object({
  searchQuery: z.string({
    required_error: 'Please enter a stock symbol in NDX100',
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { searchQuery },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3"
      >
        <Search strokeWidth={2.5} size={30} className=" ml-1 text-yellow-500 hidden md:block" />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className=" flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder="Search stock by symbol"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-full bg-yellow-500">
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default SearchBar;
