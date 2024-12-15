{
  singleFilter.map((section) => (
    <Disclosure
      key={section.id}
      as="div"
      className="border-b border-gray-200 py-6"
    >
      <h3 className="-my-3 flow-root">
        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
          {/* <span className="font-medium text-gray-900">{section.name}</span> */}
          <FormLabel className="text-gray-900" id="demo-radio-buttons-group-label">{section.name}</FormLabel>
          <span className="ml-6 flex items-center">
            <PlusIcon
              aria-hidden="true"
              className="size-5 group-data-[open]:hidden"
            />
            <MinusIcon
              aria-hidden="true"
              className="size-5 [.group:not([data-open])_&]:hidden"
            />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel className="pt-6">
        <div className="space-y-4">
          {section.options.map((option, optionIdx) => (
            <FormControl>
                <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  ));
}
