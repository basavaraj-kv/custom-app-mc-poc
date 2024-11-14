import Constraints from "@commercetools-uikit/constraints";
import Spacings from "@commercetools-uikit/spacings";
import TextInput from "@commercetools-uikit/text-input";
import PrimaryButton from '@commercetools-uikit/primary-button';
import Text from '@commercetools-uikit/text';
import { useState } from "react";
import { axioHandler } from "../../helpers";
import config from "../../../custom-application-config.mjs";
import React from "react";

const CreatCustomObjectForm = (props) => {

    const [containerName, containerNameHandler] = useState('');
    const [customObjKey, customObjKeyHandler] = useState('')
    const [customObjVal, customObjValHandler] = useState('')
    const [payload, payloadHandler] = useState({})


    const constructPayloadHandler = async () => {
        let obj = {
            "container": containerName,
            "key": customObjKey,
            "value": customObjVal
        }
        console.log(obj);
        payloadHandler(obj);
        const respo = await axioHandler(`/${config.env.development.initialProjectKey}/custom-objects`, { method: 'post', data: obj });
        console.log(respo)
        props.getData();
    }

    return (

        <Constraints.Horizontal max={7}>
            <Text.Subheadline as="h4">
                Create Custom object
            </Text.Subheadline>
            <Spacings.Stack scale="m">
                <TextInput value={containerName} onChange={(event) => containerNameHandler(event.target.value)} placeholder={'Enter a Container Name:'} />
                <TextInput value={customObjKey} onChange={(event) => customObjKeyHandler(event.target.value)} placeholder={'Enter a Object Key:'} />
                <TextInput value={customObjVal} onChange={(event) => customObjValHandler(event.target.value)} placeholder={'Enter a Object Value:'} />
                <PrimaryButton
                    label="Create Object"
                    onClick={() => constructPayloadHandler()}
                    isDisabled={false}
                />
            </Spacings.Stack>
        </Constraints.Horizontal>
    )
}

export default CreatCustomObjectForm;
