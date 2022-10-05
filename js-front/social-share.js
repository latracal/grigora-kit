window.addEventListener( 'load', function () {
	const elements = document.getElementsByClassName(
		'grigora-kit-social-share'
	);


    let items = elements[0].children[0].children[0].children

    

    for ( var i = 0; i < items.length; i++ ) {

        let index = i

        items[i].addEventListener('click', () => {
            
            
            //Share to respective social media
            let url = window.location.href
            let title = document.title
            let text = 'Checkout the blogs in this website: '
            console.log("This is title ",title)
            

            // console.log(typeof items[index].className)

            
            if (items[index].className.includes('whatsapp')){
                window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(text) + ' ' + encodeURIComponent(url), '_blank');
            }

            else if (items[index].className.includes('facebook')){        
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank');
            }

            else if (items[index].className.includes('twitter')){
                window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '_blank');
            }

            else if (items[index].className.includes('instagram')){
                window.open('https://www.instagram.com/?url=' + encodeURIComponent(url), '_blank');
            }

            else if (items[index].className.includes('linkedin')){
                window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url) , '_blank');
            }

            else if (items[index].className.includes('pinterest')){
                window.open('https://pinterest.com/pin/create/button/?url=' + encodeURIComponent(url) + '&description=' + encodeURIComponent(text), '_blank');
            }

            else if (items[index].className.includes('reddit')){
                window.open('https://reddit.com/submit?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title), '_blank');
            }

            else if (items[index].className.includes('telegram')){
                window.open('https://telegram.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '_blank');
            }

            else if (items[index].className.includes('snapchat')){
                window.open('https://www.snapchat.com/add/?url=' + encodeURIComponent(url), '_blank');
            }

        


            
        });
        
        
    }






}
);