/**
 * https://ant.design/components/button/
 */
import ButtonAnt, { ButtonProps } from 'antd/lib/button';
import { useIntl } from 'react-intl';

import { MsgProps, msg } from 'src/i18n/Msg';

type Props = Omit<ButtonProps, 'children'> & {
  text: MsgProps;
};

export const Button: React.FC<Props> = ({ text, ...props }) => {
  const intl = useIntl();

  return <ButtonAnt {...props}>{msg(intl, text)}</ButtonAnt>;
};
