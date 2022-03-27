/**
 * https://ant.design/components/page-header/
 */
import PageHeaderAnt, { PageHeaderProps } from 'antd/lib/page-header';

import { Msg, MsgProps } from 'src/i18n/Msg';

type Props = Omit<PageHeaderProps, 'title'> & {
  title: MsgProps;
};

export const PageHeader: React.FC<Props> = ({ title, ...props }) => (
  <PageHeaderAnt title={<Msg {...title} />} {...props} />
);
