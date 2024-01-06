Include details about your SDK design in this file.

# Design Patterns

## Custom HTTP Client for enhancned flexibility

I designed a custom HTTP Client interface enabling users to inject different HTTP client implementations (Axios, Fetch etc.). This makes the application more adapabtable to changes, additionally this decoupling results in creating a more consistent and reliable testing environment

## Things I left out

I followed an iterative process in designing the app, this involved building a 'bare bones' SDK and then manually testing it on another project to try and envision how I would make the SDK more usable. In the process; I decided to:

- break down different errors into classes giving the end user the flexibility to handle each type of error in a manner they deemed appropriate for their use case. Additionally, this helped me individually test each error case to build more robust tests

- I did not design the SDK necessarily as a mirror to the Lord of the Rings API. There are few 'options' I left out when building out the filtering function. I did not see the need to include the options: 'include/exlucde' and 'doesNotExist'. I couldn't envision how a user would use these given the functions I had already built

- I followed a modular approach where relevant in designing the structure of the SDK to enhance readability and scalability

- I designed a custom HTTP Client interface enabling users to inject different HTTP client implementations (Axios, Fetch etc.). This makes the application more adapabtable to changes, additionally this decoupling results in creating a more consistent and reliable testing environment
