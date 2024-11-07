import Text from '@commercetools-uikit/text';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { InformationIcon } from '@commercetools-uikit/icons';
import NumberInput from '@commercetools-uikit/number-input';
import TextInput from '@commercetools-uikit/text-input';
import Constraints from '@commercetools-uikit/constraints';
import { ContentNotification } from '@commercetools-uikit/notifications';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Link from '@commercetools-uikit/link';
import Grid from '@commercetools-uikit/grid';
import * as XLSX from "xlsx";
import { useState } from 'react';
import axios from 'axios';

export const Success = () => (
    <ContentNotification type="success">
        This is an success message
    </ContentNotification>
);
export const Info = () => (
    <ContentNotification type="info">This is an info message</ContentNotification>
);
export const Warning = () => (
    <ContentNotification type="warning">
        This is an warning message
    </ContentNotification>
);
export const Error = () => (
    <ContentNotification type="error">
        This is an error message
    </ContentNotification>
);

const handleClick = (setClick) => {
    alert('Button clicked');
    setClick(1);
}

const Sample = () => {
    const [click, setClick] = useState(0);
    return (

        <>
            <Constraints.Horizontal max={8}>
                <Text.Body>{'Sample Page'}</Text.Body>
                <TextInput
                    placeholder='Enter Text:'
                    onChange={(/** event */) => {/* alert(event.target.value)*/ }}
                />
                <br />
                <NumberInput
                    placeholder={'Enter a number:'}
                    value={undefined}
                    max={10}
                    onChange={
                        (/** event */) => {
                            // alert(event.target.value)
                        }
                    }
                />
                <br />
                <PrimaryButton
                    // iconLeft={<InformationIcon />}
                    label="Submit"
                    onClick={() => handleClick(setClick)}
                    isDisabled={false}
                />
            </Constraints.Horizontal>
            <br />
            {
                click === 1 && <Success />
            }
            {
                click === 1 && <br />
            }
            <Grid
                gridGap="16px"
                gridAutoColumns="1fr"
                gridTemplateColumns="repeat(3, 1fr)"
            >
                <Grid.Item>{'1'}</Grid.Item>
                <Grid.Item>{'2'}</Grid.Item>
                <Grid.Item>{'3'}</Grid.Item>
                <Grid.Item>{'4'}</Grid.Item>
                <Grid.Item>{'5'}</Grid.Item>
            </Grid>
            <br />
        </>
    )
}

export default Sample;
