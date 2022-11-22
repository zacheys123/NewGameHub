export const getUser = async (response, dispatch, navigate) => {
	var base64Url = response.credential.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonpayload = decodeURIComponent(atob(base64));
	dispatch({
		type: 'GET_CURRENT_USER',
		payload: JSON.parse(jsonpayload),
	});
	navigate('/');
};
