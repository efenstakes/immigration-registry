# Immigration Registry

This project contains the Immigration Registry API.

PS. I do not claim to fully understand the immigration process and as such this project should not be considered to be a fully functional immigration platform.

## Entities

1. Staff - Supervisors, admins, registry center staff and supervisors as well as residence staff and supervisors.
        More roles can be added to further control how the system functions.

2. Immigrants

3. Registry Center - A facility that receives immigrants.

4. Request - A request by an immigrant for asylum or any other thing. This system assumes that this is facilitated by a staff and each request has a process and list of requirements that need to be fulfilled before the request status is considered successful.

5. Residence - A facility where immigrants can stay upon successful entry. The staffers in these facilities are responsible for updating the system to properly track when an immigrant came in and when they left.


## Function
This project is still under development and as such, the documentation and logic may change in the future. 

### Authentication
Authentication requires that access token be passed but the desired way to do this is to use the following logic.

```
res.cookie("ACCESS_TOKEN", JSON.stringify(accessToken), {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: dayjs().add(30, "days").toDate(),
})
```

The code will be updated to reflect this as well as the auth middleware.


### Resolvers
As per current iteration, resolvers only exist in resolvers.ts files but the desired state is to also have all GraphQLObjects like the ImmigrantType to have their resolvers to get `immigrant` requests for example to expand search abilities of the project.

The code will be updated to reflect this as well as the auth middleware.


## Final Note
Feel free to clone the code, make adjustments and even create PRs.

Long Live The Code. #LLTC.
