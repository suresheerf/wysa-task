# wysa task api

## first user has to register with nick name and password

by sending post request to `https://wysa-ocj2.onrender.com/api/user/signup` user will be created and JWT token will be sent ,this token will be used to access protected end points.

## user can login

by sending post request to `https://wysa-ocj2.onrender.com/api/user/login` will login the user and will send JWT tolen

## get all question (not protected route)

by sending get to `https://wysa-ocj2.onrender.com/api/question/all` will give all questions at a time

## get specific question(not protected route)

by sending get to `https://wysa-ocj2.onrender.com/api/question/:questionId` will give specific question

## update user response to a question(protected route)

by sending post request to `https://wysa-ocj2.onrender.com/api/answer/:questionId` will store user response to a question

## at end to get score(protected route)

by sending get request to `https://wysa-ocj2.onrender.com/api/answer/score` will get the user score at last screen

-protected routes needs to sent authorization token ,BEAR token .

postman collection api documentation [link](https://documenter.getpostman.com/view/16750472/2s93sW9vgW)
