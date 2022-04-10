import { Wrapper, Icon } from './OpenCloseIcon.styles';

const OpenCloseIcon = ({ open }) => {
    return (
        <Wrapper>
            <Icon open={open}>^</Icon>
        </Wrapper>
    )
}
export default OpenCloseIcon