'use strict';

const { updateCategory } = wp.blocks;
const { SVG, G, Path, Polygon, Rect, Circle } = wp.components;

( function () {
	updateCategory( 'grigora-kit', {
		icon: /*#__PURE__*/ React.createElement(
			'svg',
			{
				width: '24',
				height: '24',
				viewBox: '0 0 24 24',
				fill: 'none',
				xmlns: 'http://www.w3.org/2000/svg',
			},
			/*#__PURE__*/ React.createElement( 'path', {
				d: 'M12.2348 5.62255C11.9797 5.83777 11.6636 5.96787 11.3308 5.99465C10.998 6.02142 10.6652 5.94352 10.3789 5.77186C10.0926 5.6002 9.86713 5.34336 9.73411 5.03729C9.60109 4.73122 9.56714 4.39124 9.63702 4.06493C9.70689 3.73862 9.8771 3.44232 10.1238 3.21749C10.3705 2.99265 10.6814 2.85055 11.0129 2.81105C11.3444 2.77156 11.68 2.83665 11.9727 2.99723C12.2653 3.15781 12.5004 3.40583 12.6451 3.70658C12.7977 4.02646 12.8402 4.38778 12.766 4.73431C12.6918 5.08083 12.505 5.39311 12.2348 5.62255V5.62255Z',
				fill: '#9404E6',
			} ),
			/*#__PURE__*/ React.createElement( 'path', {
				d: 'M5.05808 3.27593C5.17543 3.22604 5.30125 3.2003 5.42834 3.2002C5.55543 3.20009 5.68129 3.22562 5.79871 3.27531C5.91614 3.32501 6.02282 3.39789 6.11264 3.4898C6.20247 3.58171 6.27367 3.69082 6.32217 3.8109C6.37195 3.93013 6.39788 4.05833 6.39843 4.18796C6.39898 4.31759 6.37413 4.44602 6.32535 4.56568C6.27658 4.68534 6.20487 4.79381 6.11444 4.88469C6.02401 4.97557 5.91669 5.04702 5.79882 5.09484C5.68027 5.15581 5.55071 5.19115 5.41821 5.19868C5.2857 5.2062 5.15311 5.18574 5.02868 5.13857C4.90425 5.09141 4.79067 5.01854 4.695 4.92453C4.59933 4.83051 4.52364 4.71736 4.47264 4.59212C4.42164 4.46688 4.39642 4.33225 4.39856 4.19661C4.4007 4.06098 4.43016 3.92724 4.48509 3.80376C4.54001 3.68027 4.61924 3.56967 4.71782 3.47886C4.81641 3.38804 4.93223 3.31897 5.05808 3.27593V3.27593Z',
				fill: '#9C05E5',
			} ),
			/*#__PURE__*/ React.createElement( 'path', {
				d: 'M17.9905 11.6128C18.1206 11.741 18.224 11.8943 18.2946 12.0638C18.3652 12.2333 18.4016 12.4154 18.4016 12.5994C18.4016 12.7834 18.3652 12.9656 18.2946 13.135C18.224 13.3045 18.1206 13.4579 17.9905 13.586C17.866 13.7191 17.7156 13.8244 17.5489 13.8954C17.3822 13.9664 17.2028 14.0015 17.0221 13.9986C16.7432 14.0124 16.4669 13.9383 16.231 13.7866C15.9951 13.6348 15.8113 13.4128 15.7045 13.1509C15.5977 12.8889 15.5733 12.5999 15.6346 12.3234C15.6959 12.0468 15.8398 11.7962 16.0468 11.6059C16.1744 11.4756 16.3265 11.3725 16.494 11.3029C16.6615 11.2332 16.841 11.1983 17.0221 11.2003C17.2024 11.2001 17.381 11.2365 17.5473 11.3074C17.7136 11.3782 17.8643 11.482 17.9905 11.6128Z',
				fill: 'url(#paint0_linear_1459_2)',
			} ),
			/*#__PURE__*/ React.createElement( 'path', {
				d: 'M23.6097 11.1591C23.0394 9.50108 21.891 8.1031 20.3741 7.22027C19.0963 6.48956 17.6306 6.15237 16.1614 6.2511C16.079 6.00212 15.9479 5.77194 15.7757 5.57393C15.5675 5.36142 15.2899 5.23047 14.9933 5.20483C14.6967 5.17919 14.4007 5.26057 14.159 5.43419C13.9174 5.60782 13.7461 5.86218 13.6762 6.15113C13.6063 6.44008 13.6425 6.74446 13.7782 7.00904C13.8552 7.14218 13.88 7.29908 13.8478 7.4494C13.8156 7.59972 13.7288 7.73279 13.604 7.82289C13.5144 7.88616 13.4097 7.92465 13.3004 7.93447C13.1911 7.94429 13.0812 7.92509 12.9818 7.87881C12.7453 7.76698 12.6644 7.50605 12.5026 7.31346C12.3156 7.10356 12.0802 6.94236 11.8167 6.84385C11.5532 6.74533 11.2697 6.71247 10.9906 6.74811C10.6875 6.78365 10.399 6.89746 10.1535 7.07831C9.90799 7.25917 9.71394 7.50081 9.59052 7.77941C9.43871 8.12718 9.40582 8.51519 9.49692 8.88349C9.58801 9.25179 9.79803 9.5799 10.0945 9.81715C10.3101 9.96144 10.5369 10.0882 10.7728 10.1961C10.8728 10.2894 10.9391 10.413 10.9616 10.5478C10.9841 10.6826 10.9615 10.821 10.8972 10.9416C10.859 11.0191 10.8049 11.0878 10.7385 11.1433C10.6722 11.1987 10.5949 11.2398 10.5118 11.2638C10.4286 11.2877 10.3414 11.2941 10.2556 11.2825C10.1698 11.2709 10.0874 11.2416 10.0136 11.1963C9.86159 11.0953 9.68957 11.028 9.50921 10.9991C9.32886 10.9701 9.14439 10.9802 8.96827 11.0286C8.66697 11.1116 8.40498 11.2987 8.22899 11.5566C8.053 11.8145 7.97444 12.1264 8.00732 12.4368C8.0402 12.7471 8.18237 13.0357 8.4085 13.2511C8.63464 13.4666 8.93004 13.5948 9.24206 13.6131C9.49868 13.6016 9.75325 13.562 10.0012 13.495C10.1485 13.485 10.2951 13.5233 10.4186 13.604C10.5421 13.6848 10.6359 13.8035 10.6857 13.9423C10.7364 14.083 10.7439 14.2356 10.7074 14.3805C10.6708 14.5255 10.5917 14.6563 10.4803 14.7562C10.3805 14.8445 10.2623 14.9097 10.1344 14.9473C10.0064 14.9849 9.8717 14.9939 9.73986 14.9736C9.31134 14.9712 8.89717 15.1277 8.57759 15.4127C8.25802 15.6977 8.05578 16.0911 8.01008 16.5165C7.96437 16.9419 8.07844 17.3691 8.33019 17.7153C8.58194 18.0616 8.95345 18.3022 9.37273 18.3906C9.60344 18.4416 9.84231 18.4436 10.0739 18.3965C10.3054 18.3494 10.5244 18.2542 10.7168 18.1172C10.779 18.0737 10.8848 17.9619 10.9595 18.0613C11.9773 19.3418 13.4017 20.238 14.9978 20.6023C16.2742 20.9032 17.6077 20.8603 18.862 20.478C20.1131 20.0932 21.2359 19.376 22.1101 18.403C22.9848 17.439 23.5852 16.2589 23.8489 14.9851C24.1126 13.7113 24.03 12.3903 23.6097 11.1591V11.1591ZM19.5465 16.2534C19.5609 16.6748 19.4638 17.0925 19.2649 17.4644C19.0661 17.8363 18.7726 18.1494 18.414 18.3719C17.9956 18.6554 17.5008 18.8049 16.9953 18.8006C16.573 18.8124 16.1549 18.7137 15.7827 18.5143C15.4104 18.3148 15.0969 18.0216 14.8734 17.6637C14.5885 17.2485 14.4366 16.7567 14.4378 16.2534C14.4378 15.9255 14.5012 15.6006 14.6245 15.2967L15.8192 15.775C15.7568 15.9268 15.725 16.0894 15.7259 16.2534C15.7259 16.4166 15.7581 16.5782 15.8206 16.7289C15.8831 16.8797 15.9748 17.0166 16.0904 17.132C16.2059 17.2474 16.3431 17.3389 16.4941 17.4014C16.6451 17.4638 16.8069 17.4959 16.9704 17.4959C17.3004 17.4959 17.617 17.365 17.8504 17.132C18.0837 16.899 18.2149 16.583 18.2149 16.2534C18.2268 15.9989 18.1565 15.7474 18.0141 15.5359C17.8718 15.3244 17.6651 15.1643 17.4246 15.0792C17.2697 15.1162 17.111 15.1349 16.9517 15.1351C16.6138 15.1437 16.2777 15.0835 15.9639 14.9581C15.6501 14.8327 15.3651 14.6449 15.1264 14.406C14.8877 14.167 14.7002 13.8821 14.5754 13.5684C14.4506 13.2548 14.3911 12.9191 14.4005 12.5818C14.3979 12.2442 14.4632 11.9096 14.5925 11.5977C14.7219 11.2858 14.9126 11.003 15.1534 10.766C15.3942 10.5291 15.6802 10.3428 15.9945 10.2182C16.3087 10.0936 16.6448 10.0333 16.9828 10.0408L17.7295 8.27642L18.75 8.7113L18.0717 10.2893C18.5132 10.4929 18.8853 10.8212 19.142 11.2336C19.4565 11.7225 19.5895 12.3059 19.5178 12.8824C19.4462 13.459 19.1745 13.9923 18.75 14.3896C19.0064 14.627 19.2099 14.9157 19.3471 15.2368C19.4844 15.5579 19.5523 15.9043 19.5465 16.2534Z',
				fill: 'url(#paint1_linear_1459_2)',
			} ),
			/*#__PURE__*/ React.createElement( 'path', {
				d: 'M0.41454 6.6403C0.439896 6.50739 0.499293 6.38332 0.586929 6.28022C0.674565 6.17712 0.787443 6.09851 0.914539 6.05207C1.08047 5.98908 1.26263 5.98307 1.43236 6.03496C1.60209 6.08686 1.74973 6.19372 1.85207 6.33873C1.9544 6.48374 2.00561 6.65867 1.99763 6.83597C1.98965 7.01327 1.92293 7.18289 1.80799 7.31812C1.69304 7.45335 1.53639 7.54652 1.36269 7.58296C1.18899 7.6194 1.0081 7.59704 0.848499 7.5194C0.688897 7.44177 0.559643 7.31326 0.481081 7.15412C0.402519 6.99497 0.379111 6.81421 0.41454 6.6403Z',
				fill: '#A306E4',
			} ),
			/*#__PURE__*/ React.createElement( 'path', {
				d: 'M6.0305 6.86617C6.2414 6.79433 6.46782 6.78052 6.68593 6.82618C6.90405 6.87184 7.10577 6.97528 7.26987 7.12561C7.47722 7.34918 7.59446 7.64121 7.59908 7.94566C7.60369 8.25011 7.49537 8.54554 7.29488 8.77525C7.0944 9.00497 6.81588 9.15279 6.51277 9.19036C6.20966 9.22793 5.9033 9.15259 5.65249 8.97881C5.49345 8.84874 5.36939 8.68125 5.29149 8.49145C5.2136 8.30165 5.18433 8.0955 5.20632 7.8916C5.23302 7.6607 5.32453 7.442 5.47032 7.26061C5.61611 7.07922 5.81027 6.9425 6.0305 6.86617Z',
				fill: '#9A05E5',
			} ),
			/*#__PURE__*/ React.createElement( 'path', {
				d: 'M2.4016 9.15909C2.40531 9.00927 2.45249 8.86377 2.53735 8.74042C2.62221 8.61706 2.74107 8.52118 2.8794 8.46452C2.99146 8.41657 3.11292 8.39482 3.23459 8.4009C3.35626 8.40699 3.47496 8.44075 3.5817 8.49964C3.68845 8.55852 3.78044 8.64099 3.85072 8.7408C3.921 8.84061 3.96773 8.95515 3.98736 9.07575C4.00678 9.1908 4.00061 9.30874 3.96928 9.42112C3.93796 9.5335 3.88226 9.63755 3.80617 9.72582C3.73007 9.81409 3.63547 9.8844 3.52913 9.93171C3.42278 9.97903 3.30732 10.0022 3.19102 9.99953C3.08224 10.0029 2.97399 9.98312 2.87342 9.94142C2.77285 9.89971 2.68225 9.83706 2.60763 9.75761C2.533 9.67817 2.47604 9.58373 2.44053 9.48055C2.40501 9.37737 2.39174 9.2678 2.4016 9.15909V9.15909Z',
				fill: '#9F05E4',
			} ),
			/*#__PURE__*/ React.createElement( 'path', {
				d: 'M6.6029 11.9491C6.54116 11.9145 6.48971 11.8642 6.45379 11.8032C6.41787 11.7422 6.39877 11.6728 6.39844 11.602C6.39812 11.5313 6.41657 11.4617 6.45193 11.4004C6.48729 11.3391 6.53828 11.2882 6.5997 11.2531C6.66112 11.2179 6.73077 11.1997 6.80154 11.2002C6.87231 11.2008 6.94167 11.2201 7.00253 11.2562C7.0634 11.2923 7.1136 11.3439 7.148 11.4058C7.1824 11.4676 7.19978 11.5375 7.19836 11.6082C7.19697 11.6773 7.17771 11.7449 7.14245 11.8043C7.10719 11.8637 7.05714 11.913 6.99718 11.9473C6.93721 11.9817 6.86938 11.9999 6.80028 12.0002C6.73118 12.0005 6.66318 11.9829 6.6029 11.9491V11.9491Z',
				fill: '#9A05E5',
			} ),
			/*#__PURE__*/ React.createElement( 'path', {
				d: 'M2.13408 12.0297C2.39033 11.9716 2.65855 11.9993 2.89757 12.1084C3.13658 12.2175 3.33318 12.402 3.45718 12.6337C3.58118 12.8653 3.62572 13.1313 3.58397 13.3907C3.54222 13.6501 3.41649 13.8886 3.22608 14.0697C3.09217 14.197 2.93068 14.2916 2.75419 14.3463C2.57769 14.401 2.39096 14.4141 2.20855 14.3848C2.02613 14.3554 1.85296 14.2843 1.70252 14.177C1.55209 14.0698 1.42845 13.9292 1.34126 13.7663C1.25406 13.6034 1.20566 13.4226 1.19982 13.2379C1.19398 13.0533 1.23086 12.8697 1.30759 12.7017C1.38432 12.5336 1.49883 12.3855 1.64219 12.2689C1.78554 12.1524 1.95388 12.0705 2.13408 12.0297V12.0297Z',
				fill: '#A106E4',
			} ),
			/*#__PURE__*/ React.createElement( 'path', {
				d: 'M5.9572 14.0367C6.13307 13.9871 6.31931 13.9878 6.49481 14.0388C6.6703 14.0898 6.82801 14.189 6.95006 14.3253C7.04092 14.4294 7.10946 14.5511 7.15145 14.6828C7.19344 14.8146 7.20797 14.9536 7.19416 15.0912C7.18034 15.2288 7.13846 15.3621 7.07112 15.4828C7.00378 15.6035 6.91241 15.7091 6.80268 15.793C6.69294 15.8769 6.56718 15.9373 6.43318 15.9705C6.29919 16.0037 6.15981 16.0089 6.0237 15.986C5.88759 15.963 5.75763 15.9122 5.6419 15.8369C5.52616 15.7615 5.4271 15.6631 5.35087 15.5479C5.26737 15.4131 5.21671 15.2606 5.20301 15.1026C5.1893 14.9446 5.21292 14.7856 5.27197 14.6384C5.33101 14.4913 5.42381 14.3601 5.54286 14.2556C5.6619 14.151 5.80385 14.0761 5.9572 14.0367V14.0367Z',
				fill: '#9A05E5',
			} ),
			/*#__PURE__*/ React.createElement(
				'defs',
				null,
				/*#__PURE__*/ React.createElement(
					'linearGradient',
					{
						id: 'paint0_linear_1459_2',
						x1: '15.6236',
						y1: '12.4267',
						x2: '18.4455',
						y2: '12.4267',
						gradientUnits: 'userSpaceOnUse',
					},
					/*#__PURE__*/ React.createElement( 'stop', {
						'stop-color': '#8E03E7',
					} ),
					/*#__PURE__*/ React.createElement( 'stop', {
						offset: '1',
						'stop-color': '#8A03E8',
					} )
				),
				/*#__PURE__*/ React.createElement(
					'linearGradient',
					{
						id: 'paint1_linear_1459_2',
						x1: '-0.886504',
						y1: '12.9966',
						x2: '25.676',
						y2: '12.9966',
						gradientUnits: 'userSpaceOnUse',
					},
					/*#__PURE__*/ React.createElement( 'stop', {
						'stop-color': '#A306E4',
					} ),
					/*#__PURE__*/ React.createElement( 'stop', {
						offset: '1',
						'stop-color': '#8001E9',
					} )
				)
			)
		),
	} );
} )();

// const { updateCategory } = wp.blocks;
// const { SVG, G, Path, Polygon, Rect, Circle } = wp.components;

// (function() {
// 	updateCategory('grigora-kit', { icon: (
// 		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12.2348 5.62255C11.9797 5.83777 11.6636 5.96787 11.3308 5.99465C10.998 6.02142 10.6652 5.94352 10.3789 5.77186C10.0926 5.6002 9.86713 5.34336 9.73411 5.03729C9.60109 4.73122 9.56714 4.39124 9.63702 4.06493C9.70689 3.73862 9.8771 3.44232 10.1238 3.21749C10.3705 2.99265 10.6814 2.85055 11.0129 2.81105C11.3444 2.77156 11.68 2.83665 11.9727 2.99723C12.2653 3.15781 12.5004 3.40583 12.6451 3.70658C12.7977 4.02646 12.8402 4.38778 12.766 4.73431C12.6918 5.08083 12.505 5.39311 12.2348 5.62255V5.62255Z" fill="#9404E6"/>
//         <path d="M5.05808 3.27593C5.17543 3.22604 5.30125 3.2003 5.42834 3.2002C5.55543 3.20009 5.68129 3.22562 5.79871 3.27531C5.91614 3.32501 6.02282 3.39789 6.11264 3.4898C6.20247 3.58171 6.27367 3.69082 6.32217 3.8109C6.37195 3.93013 6.39788 4.05833 6.39843 4.18796C6.39898 4.31759 6.37413 4.44602 6.32535 4.56568C6.27658 4.68534 6.20487 4.79381 6.11444 4.88469C6.02401 4.97557 5.91669 5.04702 5.79882 5.09484C5.68027 5.15581 5.55071 5.19115 5.41821 5.19868C5.2857 5.2062 5.15311 5.18574 5.02868 5.13857C4.90425 5.09141 4.79067 5.01854 4.695 4.92453C4.59933 4.83051 4.52364 4.71736 4.47264 4.59212C4.42164 4.46688 4.39642 4.33225 4.39856 4.19661C4.4007 4.06098 4.43016 3.92724 4.48509 3.80376C4.54001 3.68027 4.61924 3.56967 4.71782 3.47886C4.81641 3.38804 4.93223 3.31897 5.05808 3.27593V3.27593Z" fill="#9C05E5"/>
//         <path d="M17.9905 11.6128C18.1206 11.741 18.224 11.8943 18.2946 12.0638C18.3652 12.2333 18.4016 12.4154 18.4016 12.5994C18.4016 12.7834 18.3652 12.9656 18.2946 13.135C18.224 13.3045 18.1206 13.4579 17.9905 13.586C17.866 13.7191 17.7156 13.8244 17.5489 13.8954C17.3822 13.9664 17.2028 14.0015 17.0221 13.9986C16.7432 14.0124 16.4669 13.9383 16.231 13.7866C15.9951 13.6348 15.8113 13.4128 15.7045 13.1509C15.5977 12.8889 15.5733 12.5999 15.6346 12.3234C15.6959 12.0468 15.8398 11.7962 16.0468 11.6059C16.1744 11.4756 16.3265 11.3725 16.494 11.3029C16.6615 11.2332 16.841 11.1983 17.0221 11.2003C17.2024 11.2001 17.381 11.2365 17.5473 11.3074C17.7136 11.3782 17.8643 11.482 17.9905 11.6128Z" fill="url(#paint0_linear_1459_2)"/>
//         <path d="M23.6097 11.1591C23.0394 9.50108 21.891 8.1031 20.3741 7.22027C19.0963 6.48956 17.6306 6.15237 16.1614 6.2511C16.079 6.00212 15.9479 5.77194 15.7757 5.57393C15.5675 5.36142 15.2899 5.23047 14.9933 5.20483C14.6967 5.17919 14.4007 5.26057 14.159 5.43419C13.9174 5.60782 13.7461 5.86218 13.6762 6.15113C13.6063 6.44008 13.6425 6.74446 13.7782 7.00904C13.8552 7.14218 13.88 7.29908 13.8478 7.4494C13.8156 7.59972 13.7288 7.73279 13.604 7.82289C13.5144 7.88616 13.4097 7.92465 13.3004 7.93447C13.1911 7.94429 13.0812 7.92509 12.9818 7.87881C12.7453 7.76698 12.6644 7.50605 12.5026 7.31346C12.3156 7.10356 12.0802 6.94236 11.8167 6.84385C11.5532 6.74533 11.2697 6.71247 10.9906 6.74811C10.6875 6.78365 10.399 6.89746 10.1535 7.07831C9.90799 7.25917 9.71394 7.50081 9.59052 7.77941C9.43871 8.12718 9.40582 8.51519 9.49692 8.88349C9.58801 9.25179 9.79803 9.5799 10.0945 9.81715C10.3101 9.96144 10.5369 10.0882 10.7728 10.1961C10.8728 10.2894 10.9391 10.413 10.9616 10.5478C10.9841 10.6826 10.9615 10.821 10.8972 10.9416C10.859 11.0191 10.8049 11.0878 10.7385 11.1433C10.6722 11.1987 10.5949 11.2398 10.5118 11.2638C10.4286 11.2877 10.3414 11.2941 10.2556 11.2825C10.1698 11.2709 10.0874 11.2416 10.0136 11.1963C9.86159 11.0953 9.68957 11.028 9.50921 10.9991C9.32886 10.9701 9.14439 10.9802 8.96827 11.0286C8.66697 11.1116 8.40498 11.2987 8.22899 11.5566C8.053 11.8145 7.97444 12.1264 8.00732 12.4368C8.0402 12.7471 8.18237 13.0357 8.4085 13.2511C8.63464 13.4666 8.93004 13.5948 9.24206 13.6131C9.49868 13.6016 9.75325 13.562 10.0012 13.495C10.1485 13.485 10.2951 13.5233 10.4186 13.604C10.5421 13.6848 10.6359 13.8035 10.6857 13.9423C10.7364 14.083 10.7439 14.2356 10.7074 14.3805C10.6708 14.5255 10.5917 14.6563 10.4803 14.7562C10.3805 14.8445 10.2623 14.9097 10.1344 14.9473C10.0064 14.9849 9.8717 14.9939 9.73986 14.9736C9.31134 14.9712 8.89717 15.1277 8.57759 15.4127C8.25802 15.6977 8.05578 16.0911 8.01008 16.5165C7.96437 16.9419 8.07844 17.3691 8.33019 17.7153C8.58194 18.0616 8.95345 18.3022 9.37273 18.3906C9.60344 18.4416 9.84231 18.4436 10.0739 18.3965C10.3054 18.3494 10.5244 18.2542 10.7168 18.1172C10.779 18.0737 10.8848 17.9619 10.9595 18.0613C11.9773 19.3418 13.4017 20.238 14.9978 20.6023C16.2742 20.9032 17.6077 20.8603 18.862 20.478C20.1131 20.0932 21.2359 19.376 22.1101 18.403C22.9848 17.439 23.5852 16.2589 23.8489 14.9851C24.1126 13.7113 24.03 12.3903 23.6097 11.1591V11.1591ZM19.5465 16.2534C19.5609 16.6748 19.4638 17.0925 19.2649 17.4644C19.0661 17.8363 18.7726 18.1494 18.414 18.3719C17.9956 18.6554 17.5008 18.8049 16.9953 18.8006C16.573 18.8124 16.1549 18.7137 15.7827 18.5143C15.4104 18.3148 15.0969 18.0216 14.8734 17.6637C14.5885 17.2485 14.4366 16.7567 14.4378 16.2534C14.4378 15.9255 14.5012 15.6006 14.6245 15.2967L15.8192 15.775C15.7568 15.9268 15.725 16.0894 15.7259 16.2534C15.7259 16.4166 15.7581 16.5782 15.8206 16.7289C15.8831 16.8797 15.9748 17.0166 16.0904 17.132C16.2059 17.2474 16.3431 17.3389 16.4941 17.4014C16.6451 17.4638 16.8069 17.4959 16.9704 17.4959C17.3004 17.4959 17.617 17.365 17.8504 17.132C18.0837 16.899 18.2149 16.583 18.2149 16.2534C18.2268 15.9989 18.1565 15.7474 18.0141 15.5359C17.8718 15.3244 17.6651 15.1643 17.4246 15.0792C17.2697 15.1162 17.111 15.1349 16.9517 15.1351C16.6138 15.1437 16.2777 15.0835 15.9639 14.9581C15.6501 14.8327 15.3651 14.6449 15.1264 14.406C14.8877 14.167 14.7002 13.8821 14.5754 13.5684C14.4506 13.2548 14.3911 12.9191 14.4005 12.5818C14.3979 12.2442 14.4632 11.9096 14.5925 11.5977C14.7219 11.2858 14.9126 11.003 15.1534 10.766C15.3942 10.5291 15.6802 10.3428 15.9945 10.2182C16.3087 10.0936 16.6448 10.0333 16.9828 10.0408L17.7295 8.27642L18.75 8.7113L18.0717 10.2893C18.5132 10.4929 18.8853 10.8212 19.142 11.2336C19.4565 11.7225 19.5895 12.3059 19.5178 12.8824C19.4462 13.459 19.1745 13.9923 18.75 14.3896C19.0064 14.627 19.2099 14.9157 19.3471 15.2368C19.4844 15.5579 19.5523 15.9043 19.5465 16.2534Z" fill="url(#paint1_linear_1459_2)"/>
//         <path d="M0.41454 6.6403C0.439896 6.50739 0.499293 6.38332 0.586929 6.28022C0.674565 6.17712 0.787443 6.09851 0.914539 6.05207C1.08047 5.98908 1.26263 5.98307 1.43236 6.03496C1.60209 6.08686 1.74973 6.19372 1.85207 6.33873C1.9544 6.48374 2.00561 6.65867 1.99763 6.83597C1.98965 7.01327 1.92293 7.18289 1.80799 7.31812C1.69304 7.45335 1.53639 7.54652 1.36269 7.58296C1.18899 7.6194 1.0081 7.59704 0.848499 7.5194C0.688897 7.44177 0.559643 7.31326 0.481081 7.15412C0.402519 6.99497 0.379111 6.81421 0.41454 6.6403Z" fill="#A306E4"/>
//         <path d="M6.0305 6.86617C6.2414 6.79433 6.46782 6.78052 6.68593 6.82618C6.90405 6.87184 7.10577 6.97528 7.26987 7.12561C7.47722 7.34918 7.59446 7.64121 7.59908 7.94566C7.60369 8.25011 7.49537 8.54554 7.29488 8.77525C7.0944 9.00497 6.81588 9.15279 6.51277 9.19036C6.20966 9.22793 5.9033 9.15259 5.65249 8.97881C5.49345 8.84874 5.36939 8.68125 5.29149 8.49145C5.2136 8.30165 5.18433 8.0955 5.20632 7.8916C5.23302 7.6607 5.32453 7.442 5.47032 7.26061C5.61611 7.07922 5.81027 6.9425 6.0305 6.86617Z" fill="#9A05E5"/>
//         <path d="M2.4016 9.15909C2.40531 9.00927 2.45249 8.86377 2.53735 8.74042C2.62221 8.61706 2.74107 8.52118 2.8794 8.46452C2.99146 8.41657 3.11292 8.39482 3.23459 8.4009C3.35626 8.40699 3.47496 8.44075 3.5817 8.49964C3.68845 8.55852 3.78044 8.64099 3.85072 8.7408C3.921 8.84061 3.96773 8.95515 3.98736 9.07575C4.00678 9.1908 4.00061 9.30874 3.96928 9.42112C3.93796 9.5335 3.88226 9.63755 3.80617 9.72582C3.73007 9.81409 3.63547 9.8844 3.52913 9.93171C3.42278 9.97903 3.30732 10.0022 3.19102 9.99953C3.08224 10.0029 2.97399 9.98312 2.87342 9.94142C2.77285 9.89971 2.68225 9.83706 2.60763 9.75761C2.533 9.67817 2.47604 9.58373 2.44053 9.48055C2.40501 9.37737 2.39174 9.2678 2.4016 9.15909V9.15909Z" fill="#9F05E4"/>
//         <path d="M6.6029 11.9491C6.54116 11.9145 6.48971 11.8642 6.45379 11.8032C6.41787 11.7422 6.39877 11.6728 6.39844 11.602C6.39812 11.5313 6.41657 11.4617 6.45193 11.4004C6.48729 11.3391 6.53828 11.2882 6.5997 11.2531C6.66112 11.2179 6.73077 11.1997 6.80154 11.2002C6.87231 11.2008 6.94167 11.2201 7.00253 11.2562C7.0634 11.2923 7.1136 11.3439 7.148 11.4058C7.1824 11.4676 7.19978 11.5375 7.19836 11.6082C7.19697 11.6773 7.17771 11.7449 7.14245 11.8043C7.10719 11.8637 7.05714 11.913 6.99718 11.9473C6.93721 11.9817 6.86938 11.9999 6.80028 12.0002C6.73118 12.0005 6.66318 11.9829 6.6029 11.9491V11.9491Z" fill="#9A05E5"/>
//         <path d="M2.13408 12.0297C2.39033 11.9716 2.65855 11.9993 2.89757 12.1084C3.13658 12.2175 3.33318 12.402 3.45718 12.6337C3.58118 12.8653 3.62572 13.1313 3.58397 13.3907C3.54222 13.6501 3.41649 13.8886 3.22608 14.0697C3.09217 14.197 2.93068 14.2916 2.75419 14.3463C2.57769 14.401 2.39096 14.4141 2.20855 14.3848C2.02613 14.3554 1.85296 14.2843 1.70252 14.177C1.55209 14.0698 1.42845 13.9292 1.34126 13.7663C1.25406 13.6034 1.20566 13.4226 1.19982 13.2379C1.19398 13.0533 1.23086 12.8697 1.30759 12.7017C1.38432 12.5336 1.49883 12.3855 1.64219 12.2689C1.78554 12.1524 1.95388 12.0705 2.13408 12.0297V12.0297Z" fill="#A106E4"/>
//         <path d="M5.9572 14.0367C6.13307 13.9871 6.31931 13.9878 6.49481 14.0388C6.6703 14.0898 6.82801 14.189 6.95006 14.3253C7.04092 14.4294 7.10946 14.5511 7.15145 14.6828C7.19344 14.8146 7.20797 14.9536 7.19416 15.0912C7.18034 15.2288 7.13846 15.3621 7.07112 15.4828C7.00378 15.6035 6.91241 15.7091 6.80268 15.793C6.69294 15.8769 6.56718 15.9373 6.43318 15.9705C6.29919 16.0037 6.15981 16.0089 6.0237 15.986C5.88759 15.963 5.75763 15.9122 5.6419 15.8369C5.52616 15.7615 5.4271 15.6631 5.35087 15.5479C5.26737 15.4131 5.21671 15.2606 5.20301 15.1026C5.1893 14.9446 5.21292 14.7856 5.27197 14.6384C5.33101 14.4913 5.42381 14.3601 5.54286 14.2556C5.6619 14.151 5.80385 14.0761 5.9572 14.0367V14.0367Z" fill="#9A05E5"/>
//         <defs>
//         <linearGradient id="paint0_linear_1459_2" x1="15.6236" y1="12.4267" x2="18.4455" y2="12.4267" gradientUnits="userSpaceOnUse">
//         <stop stop-color="#8E03E7"/>
//         <stop offset="1" stop-color="#8A03E8"/>
//         </linearGradient>
//         <linearGradient id="paint1_linear_1459_2" x1="-0.886504" y1="12.9966" x2="25.676" y2="12.9966" gradientUnits="userSpaceOnUse">
//         <stop stop-color="#A306E4"/>
//         <stop offset="1" stop-color="#8001E9"/>
//         </linearGradient>
//         </defs>
//         </svg>

// 	) });
// })();
