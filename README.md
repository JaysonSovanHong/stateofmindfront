# stateofmind
State of Mind
This is a traveling app, it’s very simple. A user can create and log in and once they are inside, they are able to pick the state of their emotion that they are feeling, and this will give them ideas on places to travel. They can add and save their favorite ideas to their profile or story board and it will have a comment section where they can edit and delete their comments.

When I load the page, a drop-down menu will appear with create new user/login.

Create new user, send you to another page which will allow you to create a new user.

Once a new user is created, it will send you to the main page.

Main page allows user to find vacation based on their mood.

After you click on the mood it will show you a list of cities. You can save and go into the city and see information’s and a quick video tour.

In user profile, you can view the save city and a add a comment about it.

In the comment section you can add/edit/delete your comment.

There will be a log out page that brings you back to the original home screen.

Screen Shot 2021-04-08 at 7 25 15 PM

Routes
<ul>
<li>home .get('/') </li> this gets you to the home page
<li>login:.post('/login')</li> get the id and post it to the body to login 
<li> signup: .post('/signup')</li> create a login 
<li>user: .post('/user')</li> you can get to your user page
<li>save: .post('/save')</li> allows you to save the city you like 
<li> delete: .delete('/delete')</li> allows you to delete the city you do not like. 
<li>update: .put('/update')</li> lets you update your comment section 
<li>city: .getAll('/city)</li> get all the city.
 
</ul>
CRUD
BACK END
<ul>
<li>CREATE USER TABLE, MOOD TABLE, CITY TYPE</li> 
<li>creat all the routes to make sure they work</li>
<li>work on the controller to make sure its able to work with the routes</li>
</ul>
FRONT END
<ul>
<li>create an html page</li>
<ul>create a div for:
<li>home page</li>
<li>sign up page with form</li>
<li>mood page </li>
<li>user page</li>
<li>city type base on mood. (desert, beach, city, mountains, exotic, winter</li>
</ul>
<li> Connect the controller and routes to the front of the page  </li>
<li> add event listner to make sure it works</li>
<li> CSS MAGIC </li>

</ul>



