const EnabledIcon = ({ isEnabled }) => {
	const classes = ['material-symbols-outlined'];
	let enabledIcon;

	if (isEnabled === 1) {
		enabledIcon = 'check_box';
		classes.push('enabled-icon');
	} else {
		enabledIcon = 'cancel';
		classes.push('disabled-icon');
	}

	return <span className={classes.join(' ')}>{enabledIcon}</span>;
};

export default EnabledIcon;
