import * as React from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";

import { IStoreProps } from "../../types";

import "./style.scss";

const RecordPage: React.FC<IStoreProps> = observer(({ store }) => {
  const { id }: { id: string } = useParams();
  const recordId = parseInt(id, 10);

  React.useEffect(() => {
    if (recordId) {
      void store.fetchRecord(recordId);
    } else {
      store.newRecord();
    }
    return () => store.closeRecord();
  }, [id]);

  return (
    <section className='pages-post'>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/posts'>Список новостей</Link>
        </Breadcrumb.Item>
        {store.currentRecord && (
          <Breadcrumb.Item>
            {store.currentRecord.title
              ? store.currentRecord.title
              : `Новая новость`}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </section>
  );
});

export default RecordPage;
