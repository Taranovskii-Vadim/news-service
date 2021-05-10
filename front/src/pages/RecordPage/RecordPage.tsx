import * as React from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Card,
  message,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import SaveOutlined from "@ant-design/icons/SaveOutlined";
import EditorJs from "react-editor-js";

import { ROUTES } from "../../constants";
import { configEditorTools, i18n } from "../../configs";
import { IStoreProps } from "../../types";

import "./style.scss";

const { Paragraph } = Typography;

const RecordPage: React.FC<IStoreProps> = observer(({ store }) => {
  const history = useHistory();
  const { id }: { id: string } = useParams();
  const recordId = parseInt(id, 10);

  const [editor, setEditor] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (recordId) {
      void store.fetchRecord(recordId);
    } else {
      store.newRecord();
    }
    return () => store.closeRecord();
  }, [id]);

  const handleDelete = async () => {
    await store.removeRecord(recordId);
    history.push(ROUTES.records());
  };

  const handleSave = async () => {
    const editorData = await editor.save();
    store.update({ editorData });
    await store.saveRecord();
    message.info("Изменения сохранены успешно");
  };

  const extra = (
    <Space>
      {store.currentRecord?.id && (
        <Popconfirm
          title='Вы уверены, что хотите удалить эту новость?'
          onConfirm={handleDelete}
          okText='Да'
          cancelText='Нет'
        >
          <Button icon={<DeleteOutlined />} danger />
        </Popconfirm>
      )}
      <Button type='primary' icon={<SaveOutlined />} onClick={handleSave}>
        Сохранить
      </Button>
    </Space>
  );

  const handleTitleChange = (title: string) => {
    if (title.length > 0) {
      store.update({ title });
    } else {
      message.warn(`Заголовок не может быть пустым`);
    }
  };

  const handleDescriptionChange = (description: string) => {
    if (description.length > 0) {
      store.update({ description });
    } else {
      message.warn(`Описание не может быть пустым`);
    }
  };

  const title = (
    <div>
      <Paragraph
        className='post-title'
        editable={{ onChange: handleTitleChange }}
      >
        {store.currentRecord?.title ?? ``}
      </Paragraph>
      <Paragraph
        className='post-description'
        editable={{ onChange: handleDescriptionChange }}
      >
        {store.currentRecord?.description ?? ``}
      </Paragraph>
    </div>
  );

  return (
    <section className='pages-post'>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/records'>Список новостей</Link>
        </Breadcrumb.Item>
        {store.currentRecord && (
          <Breadcrumb.Item>
            {store.currentRecord.title
              ? store.currentRecord.title
              : `Новая новость`}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
      {store.currentRecord ? (
        <Card title={title} extra={extra}>
          <EditorJs
            i18n={i18n}
            onReady={(instance?: any) => {
              if (instance) {
                setEditor(instance);
              }
            }}
            data={store.currentRecord.editorData}
          />
        </Card>
      ) : (
        `Loading...`
      )}
    </section>
  );
});

export default RecordPage;
