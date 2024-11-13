import axios from 'axios';
import { useEffect, useState } from 'react';
import createHttpUserAgent from '@commercetools/http-user-agent';
import {
  buildApiUrl,
  executeHttpClientRequest,
} from '@commercetools-frontend/application-shell';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { InformationIcon } from '@commercetools-uikit/icons';
 
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';
import Text from '@commercetools-uikit/text';
import CreatCustomObjectForm from './create-custom-object';
import SpacingsInsetSquish from '@commercetools-uikit/spacings-inset-squish';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { axioHandler } from '../../helpers';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'lastModifiedAt', label: 'Last ModifiedAt' },
  { key: 'container', label: 'Container' },
  { key: 'key', label: 'KEY' }

];

const userAgent = createHttpUserAgent({
  name: 'axios-client',
  version: '1.0.0',
  libraryName: window.app.applicationName,
  contactEmail: 'support@my-company.com',
});

 
const CustomObjects = () => {
  const [customObjects, setcustomObjects] = useState({})

  useEffect(() => {
    async function execute() {
      console.log("fetch")
      try {
        const data = await axioHandler('/testrangaproject/custom-objects',{method:'get'})
        console.log(data)
        if (data && data.total > 0) {
          setcustomObjects(data)
        }
        // Update state with `result`
      } catch (error) {
        // Update state with `error`
      }
    }
    execute();
  }, [])


  console.log(customObjects.results)
  return (
    <>


      <SpacingsStack scale="m">
        <Text.Subheadline as="h4">
          List of custom Objects
        </Text.Subheadline>
        {customObjects && customObjects.results && <DataTableManager columns={columns}>
          <DataTable rows={customObjects.results} />
        </DataTableManager>}


        <CreatCustomObjectForm />
      </SpacingsStack >

    </>

  )
};
export default CustomObjects;