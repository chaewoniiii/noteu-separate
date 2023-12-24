import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export default function useReferenceRoomForm() {

	const navigate = useNavigate();
	/*
	 * form validation schema
	 */
	const schema = yup.object().shape({
		title: yup.string().required('Title is required'),
		content: yup.string().required('Content is required'),
	  });

	/**
	 * Handle the form submission
	 */
	const handleValidSubmit = async (value, selectedFiles, subjectId) => {
		
		const token = localStorage.getItem("_NOTEU_AUTH").replace(/^"(.*)"$/, '$1');

		const formData = new FormData();


		const referenceRoomData = {
			referenceRoomTitle: value.title,
			referenceRoomContent: value.content,
		};


		console.log(value.title);
		console.log(value.content);

		const dataBlob = new Blob([JSON.stringify(referenceRoomData)], {
			type: 'application/json'
		});

		formData.append('addRequestReferenceRoomDTO', dataBlob);
	  
		// form의 파일을 formData에 추가
		if (!selectedFiles || selectedFiles.length === 0) {
			alert("파일을 1개 이상 추가해주세요.");
			return;
		  } else {
			selectedFiles.forEach((file) => {
		  		formData.append('referenceFile', file);
				console.log(file);
			});
		}

		try {
			const response = await axios.post(`http://localhost:8081/subjects/${subjectId}/references`, formData, {
			headers: {
			  'Authorization': `${token}`,  // 토큰을 사용하여 인증
			  'Content-Type': 'multipart/form-data',
			},
		  	});
		  	if(response.status === 201) {
				alert("자료실 게시글 작성이 완료되었습니다.");
		  		navigate(`/apps/subjects/${subjectId}/referenceRoom/list`);
		  	} else {
				console.log("error : " + response.status);
			}
		  
		} catch(error) {
			console.log("error : " + error);
		}
		
	};

	return {
		schema,
		handleValidSubmit,
	};
}
