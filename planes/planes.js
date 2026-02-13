const BOLD_API_KEY = 'sk-1234567890abcdef1234567890abcdef'

const selectPlan = async (plan) => {
    console.log(`Selected plan: ${plan}`);

    // const plans = ['grow', 'expand', 'corporate', 'explore']


    const plans = {
        grow: {
            name: 'Grow',
            price: 1200,
            img: 'https://greenlightgo.es/wp-content/uploads/2024/03/como-hacer-plan-desarrollo.webp'
        },
        expand: {
            name: 'Expand',
            price: 2500,
            img: 'https://a.storyblok.com/f/112937/568x400/686f87dc2f/50-things-you-need-to-do-on-your-next-trip_square-568x400.jpg/m/620x0/filters:quality(70)/'
        },
        corporate: {
            name: 'Corporate',
            price: 0,
            img: 'https://greenlightgo.es/wp-content/uploads/2024/03/como-hacer-plan-desarrollo.webp'
        },
        explore: {
            name: 'Explore',
            price: 500,
            img: 'https://img.freepik.com/free-photo/nutshell-boats-explore-writing-near-travel-stuff_23-2147793489.jpg'
        }
    }

    if (!plans[plan]) {
        console.log(`Selected plan: ${plan} is not a valid plan`);
        return
    }

    const badge = 'USD'

    const response = await fetch('https://gpmdwebsitepga-production.up.railway.app/checkout_bold_link', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ plan: "Compra de plan " + plans[plan].name, price: plans[plan].price, badge: badge, image_url: plans[plan].img })
    })

    if (!response.ok) {
        console.log(`Error: ${response.status} ${response.statusText}`);
        return
    }

    const data = await response.json()
    if (!data) return;
    console.log(`data.payload: ${data.payload.payment_link}, url: ${data.payload.url}`);
    const { url } = data.payload

    if (!url) {
        console.log('url is not defined but payment went through');
        return
    }
    window.location.href = url;
}