import * as React from "react";
import { observer } from "mobx-react-lite";
import { Breadcrumb, Button, Card, Empty, Table } from "antd";
import { useHistory } from "react-router-dom";
import PlusCircleOutlined from "@ant-design/icons/PlusCircleOutlined";

import { ROUTES } from "../../constants";
import { IStoreProps } from "../../types";

import "./style.scss";

const PostsPage: React.FC<IStoreProps> = observer(({ store }) => {
  const history = useHistory();

  React.useEffect(() => void store.fetchRecords(), []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Заголовок",
      dataIndex: "title",
    },
    {
      title: "Краткое описание",
      dataIndex: "description",
    },
    {
      title: "Автор",
      dataIndex: "authorEmail",
    },
  ];

  const handleAdd = () => history.push(ROUTES.record("new"));

  return (
    <section className='pages-posts'>
      <Breadcrumb>
        <Breadcrumb.Item>Новости</Breadcrumb.Item>
      </Breadcrumb>
      <Card
        extra={
          <Button
            type='primary'
            icon={<PlusCircleOutlined />}
            onClick={handleAdd}
          >
            Добавить
          </Button>
        }
      >
        <Table
          dataSource={store.records.slice()}
          columns={columns}
          onRow={record => ({
            onClick: () => history.push(ROUTES.record(record.id)),
          })}
          rowKey='id'
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <p>
                    Пока нет новостей.
                    <br />
                    Добавьте первую.
                  </p>
                }
              />
            ),
          }}
          loading={store.isLoading}
        />
      </Card>
    </section>
  );
});

export default PostsPage;
