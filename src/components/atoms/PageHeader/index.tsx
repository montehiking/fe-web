/**
 * https://ant.design/components/page-header/
 */
import PageHeaderAnt, { PageHeaderProps } from 'antd/lib/page-header';

import { Msg, MsgProps } from 'src/i18n/Msg';

type Props = Omit<PageHeaderProps, 'title' | 'subTitle'> & {
  title: MsgProps;
  subTitle: MsgProps;
};

export const PageHeader: React.FC<Props> = ({ title, subTitle, ...props }) => (
  <PageHeaderAnt
    title={<Msg {...title} />}
    subTitle={<Msg {...subTitle} />}
    style={{ userSelect: 'none' }}
    {...props}
  />
);
