import { Wrapper, Icon } from './OpenCloseIcon.styles';

const OpenCloseIcon = ({ open, show }) => {
    return (
        <Wrapper>
            <Icon show={show} open={open}>^</Icon>
        </Wrapper>
    )
}
export default OpenCloseIcon