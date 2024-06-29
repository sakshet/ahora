// import { Dropdown, DropdownData} from '@Core/dropdown';
import { createStyleSheet, useStyleSheet } from '@Core/styles';
import { Heading, Text } from '@Core/text';
import React from 'react';

const homepageStyleSheet = createStyleSheet('homepageStyles', {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  },
});
export const Homepage = () => {
  const classes = useStyleSheet(homepageStyleSheet, null);
  return (
    <div className={classes.container}>
      <Heading typography="heading04">We'll be back soon</Heading>
      <Text typography="body04">All good things take time</Text>
      {/* <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', padding: '20px'}}>
        <Select
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
            { label: 'Option 4', value: 4 },
            { label: 'Option 5', value: 5 },
            { label: 'Option 6', value: 6 },
            { label: 'Option 7', value: 7 },
            { label: 'Option 8', value: 8 },
            { label: 'Option 9', value: 9 },
          ]}
          onSelect={(value: SelectData) => {}}
        />
      </div> */}
    </div>
  );
};
