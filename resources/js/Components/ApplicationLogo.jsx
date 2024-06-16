export default function ApplicationLogo(props) {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    };

    const logoStyle = {
        width: '100px',
        height: '80px',
    };
    const textStyle = {
        fontWeight: 'bold',
    };

    return (
        <div style={containerStyle}>
            <img
                {...props}
                src="https://armp.mr/wp-content/uploads/2021/03/logoipn.jpg"
                alt="Logo"
                style={logoStyle}
            />
            <div style={textStyle}>Institut Pédagogique National</div>
        </div>
    );
}
