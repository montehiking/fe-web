/**
 * https://ant.design/components/page-header/
 */
import PageHeaderAnt, { PageHeaderProps } from 'antd/lib/page-header';

import { Msg, MsgProps } from 'src/i18n/Msg';

export type Props = Omit<PageHeaderProps, 'title' | 'subTitle'> & {
  title: string | MsgProps;
  subTitle?: MsgProps;
};

export const PageHeader: React.FC<Props> = ({ title, subTitle, ...props }) => (
  <PageHeaderAnt
    title={typeof title === 'string' ? title : <Msg {...title} />}
    subTitle={subTitle ? <Msg {...subTitle} /> : undefined}
    style={{ userSelect: 'none' }}
    {...props}
  />
);
