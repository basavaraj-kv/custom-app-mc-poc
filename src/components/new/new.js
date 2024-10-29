import Text from '@commercetools-uikit/text';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { InformationIcon } from '@commercetools-uikit/icons';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Link from '@commercetools-uikit/link';
import Grid from '@commercetools-uikit/grid';
import * as XLSX from "xlsx";
import { useState } from 'react';

const New = () => {
    const [data, setData] = useState([]);

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        if (!!e.target.files[0]) {
            reader.readAsBinaryString(e.target.files[0]);
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" })
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet);
                setData(parsedData);
            }
        } else {
            setData([]);
        }
    }
    return (

        <>
            {/* <Link isExternal={true} to={'https://liverpool-configuration-ui-dot-crp-qas-dig-instcitas.uk.r.appspot.com/'}>
                Go to external link
            </Link> */}
            <input
                type='file'
                accept='.xlsx, .xls'
                onChange={handleFileUpload}
            />
            {
                data.length > 0 && console.log(data)
            }
            {/* <Text.Body>{'Custom New Page'}</Text.Body>
            <PrimaryButton
                iconLeft={<InformationIcon />}
                label="Submit"
                onClick={() => alert('Button clicked')}
                isDisabled={false}
            />
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
            </Grid> */}
        </>
    )
}

export default New;