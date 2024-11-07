import * as XLSX from "xlsx";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from "@commercetools-uikit/data-table";

const New = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    let arr1 = [];

    const divStyle = {
        overflow: 'auto'
    }

    const publishMessage = async (topic, message) => {
        try {
            const response = await axios.post('http://localhost:8080/publish', {
                topic,
                message,
            });
            alert(response.data);
        } catch (error) {
            console.error('Error publishing message:', error);
            alert('Error publishing message.');
        }
    };

    const handleFileUpload = async (e) => {
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
        let pubsubresponse = await publishMessage('testRanga', 'Test message!');
    }

    useEffect(() => {
        console.log('1');

        data.length > 0 &&
            Object.keys(data[0]).forEach((key) => (
                arr1.push(key)
            ))
        console.log('2', arr1);

        const columns = arr1?.map(key => ({
            key: key,
            label: key
        }));

        setColumns(columns);

    }, [data]);

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
            {
                data.length > 0 && <div style={divStyle}><br/><DataTable columns={columns} rows={data} /></div>
            }
            {/* {
                data.length > 0 && (
                    <table className=''>
                        <thead>
                            <tr>
                                {
                                    Object.keys(data[0]).map((key) => (
                                        <th key={key}>
                                            {key}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) => (
                                    <tr key={index}>
                                        {
                                            Object.values(row).map((value, index) => (
                                                <td key={index}>
                                                    {value}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            } */}
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
