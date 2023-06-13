import BenefitList from 'components/Card/BenefitList';
import { useLocation } from 'react-router-dom';

function BenefitCustomPage(props) {
    const location = useLocation();
    return (
        <div>
            <h1>benefit Custom page</h1>
            <h2>혜택 커스텀</h2>
            선택된 등급: {location.state.grade.gradeName}
            <hr />
            <BenefitList />
        </div>
    );
}

export default BenefitCustomPage;