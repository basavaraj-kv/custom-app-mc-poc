import React, { useEffect } from "react";
import Constraints from "@commercetools-uikit/constraints";
import Spacings from "@commercetools-uikit/spacings";
import TextInput from "@commercetools-uikit/text-input";
import PrimaryButton from '@commercetools-uikit/primary-button';
import Text from '@commercetools-uikit/text';
import { useState } from "react";
import { axioHandler } from "../../helpers";
import config from "../../../custom-application-config.mjs";
import DataTable from "@commercetools-uikit/data-table";
import SelectInput from '@commercetools-uikit/select-input';

const CustomObjectsContainer = () => {
    const [containerName, set_containerName] = useState('');
    const [customObj, set_customObj] = useState('');
    const [uniqueContainers, set_uniqueContainers] = useState([]);
    const [uniqueContainersObj, set_uniqueContainersObj] = useState({});
    const [rows, set_rows] = useState({});
    const cols = [
        { key: 'id', label: 'Id' },
        { key: 'lastModifiedAt', label: 'Last Modified At' },
        { key: 'container', label: 'Container' },
        { key: 'key', label: 'Key' },
        { key: 'value', label: 'Value' }
    ];

    const onClick_getObjects = async () => {
        try {
            const response = await axioHandler(`/${config.env.development.initialProjectKey}/custom-objects/${containerName}`, { method: 'get' });
            console.log(response);
            response?.total > 0 && set_rows(response.results);
        }
        catch (error) {
            console.log('Error', error);
        }
    }

    const onChange_Container = (event) => {
        set_containerName(event.target.value);
        // onClick_getObjects();
    }

    useEffect(async () => {
        try {
            const response = await axioHandler(`/${config.env.development.initialProjectKey}/custom-objects`, { method: 'get' });
            response?.total > 0 && set_customObj(response.results);
        } catch (error) {
            console.log('Error', error);
        }
    }, [])

    useEffect(() => {
        // console.log('customObj', customObj.length > 0 && customObj);
        const uniqueContainerNames = customObj.length > 0 && customObj.map(item => item.container).filter((container, index, arr) => arr.indexOf(container) === index);
        set_uniqueContainers(uniqueContainerNames);
        // console.log(uniqueContainers);
    }, [customObj]);

    useEffect(() => {
        const obj = uniqueContainers.length > 0 && uniqueContainers.map(key => ({
            key: key,
            label: key,
            value: key
        }));
        set_uniqueContainersObj(obj);
    }, [uniqueContainers]);

    useEffect(()=>{
        containerName !== '' && onClick_getObjects();
    }, [containerName]);

    return (
        <Constraints.Horizontal>
            <Constraints.Horizontal max={8}>
                <Text.Subheadline as="h4">
                    Get Custom Object Based on Container Name
                </Text.Subheadline>
                <Spacings.Stack scale="m">
                    <SelectInput
                        onChange={(event) => onChange_Container(event)}
                        value={containerName}
                        options={uniqueContainersObj.length > 0 ? uniqueContainersObj : []}
                    />
                    {/* <TextInput value={containerName} onChange={(event) => set_containerName(event.target.value)} placeholder={'Enter a Container Name:'} /> */}
                    {/* <PrimaryButton
                        label="Get Objects"
                        onClick={() => onClick_getObjects()}
                        isDisabled={false}
                    /> */}
                </Spacings.Stack>
            </Constraints.Horizontal>
            <br />
            {rows.length > 0 && <DataTable rows={rows} columns={cols} />}
        </Constraints.Horizontal>
    )
}

export default CustomObjectsContainer;
