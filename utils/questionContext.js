import { useContext, useState } from 'react'
import { UserContext } from '../context/userContextProvider';


const { aboutUserInfo } = useContext(UserContext);
const [questionContext, setQuestionContext] = useState('');

const { workExperience,
    education,
    location,
    name,
    professionalTitle,
    skills,
    summary,
    certifications } = aboutUserInfo;

useEffect(() => {
    setQuestionContext({
        name,
        location,
        professionalTitle,
        workExperience,
        summary,
        education,
        skills,
        certifications,
    });
}, [questionContext]);


export default questionContext