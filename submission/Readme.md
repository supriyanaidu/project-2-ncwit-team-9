<h1>Project 2: Visualizing NCWIT Data</h1>
<h2> Ashwin Sankaralingam, Gena Welk, Sreesha Nath, Supriya Naidu </h2>

As expected from real world data, we recieved a lot of data and not all of it was pretty. We decided to invest in cleaning the data and choosing the datapoints that we found to be coherent enough to answer our questions. This helped us create a story of our own. Please read ahead to know more about our visualizations and the efforts that went behind them.

<h3>The Dataset</h3>
The dataset was provided by NCWIT and consists of various demographic data about both potential and enrolled students, including graduated students.  This data was detailed by institution and by major.
<br/><br/>
We filtered the data to emphasize the story of how a student can see the history over the years of enrollment into the feild of information technology and computer science.  We had a wide array of data that were very sparse and we decided to handle the missing data. We selected 14 institutions which had consistent data for freshman, sophomore, junior, and senior GPA’s as well high school GPA’s.  Each of these 14 institutions had a minimum of 10 records each which showed the desired information. (We did not include 5th Yr Senior data as there was not sufficient information by which to draw preliminary conclusions.)

<h3>Storyline</h3>
Based off of the data we could condense, we decided to start our story by showing the enrollments of students of each and both genders per year and the distibution across races. We then moved on to project the trajectory of students grades as they transition from high school to college and through the college years. Eventually we decided to potray the nature of student dropouts from different majors and across college years. Finally, for an overview of the Total Female students that are attending programs where they utilize NCWIT Extension Services (ES) vs. simply being NCWIT Academic Alliance (AA) members.

<h3>Prototype and Process</h3>
For data cleaning, we consolidated some of the majors that were duplicated, while keeping the intent of the original.  For example, we combined the following:<br/>
-----------------------------------------<br/>
Computer and Information Science<br/>
Computer and Information Sciences<br/>
-----------------------------------------<br/>
Computer Science<br/>
Computer Science (this one had a space at the end)<br/>
Computer Science &<br/>
Computer Science +<br/>
Computer Science + X<br/>
-----------------------------------------<br/>
Electrcal & Computer Engineering<br/>
Electrical & Computer Engineering<br/>
Electrical and Computer Engineering<br/>
-----------------------------------------<br/>
General Engineering<br/>
General Engineering (this one had a space at the end)<br/>
-----------------------------------------<br/>
Information Science<br/>
Information Science (this one had a space at the end)<br/>
Information Sciences<br/>
-----------------------------------------<br/>
Information Technology<br/>
Information Technology (this one had a space at the end)<br/><br/>

Another cleaning item we did was alter the following descriptions for column “NCWIT Alliance” so that we ended up with only 2 options for this field (which left 4 records of 2,905 records as blank):<br/><br/>
Academic Alliance ---->  Academic Alliance<br/>
Academic Alliance, Academic Alliance ---->  Academic Alliance<br/>
Extension Services, Academic Alliance ---->  Extension Services<br/>
 
For our prototyping process we experimented with the designs via sketching prior to implementation. You can find them here:

_Prototypes:_ 
[viz1](https://github.com/INFO-4602-5602/project-2-ncwit-team-9/blob/master/Prototyping/IMG_3811.jpg),
[viz2](https://github.com/INFO-4602-5602/project-2-ncwit-team-9/blob/master/Prototyping/IMG_3812.jpg)

<h2>Visualizations</h2>
For all the visualizations, we decided to have a gender separated representation as we had well distributed values for all the datapoints. We have also provided an option to view the gender neutral data for all our visualization. One salient feature that we would like to emphasize on is that on choosing the gender filter, our d3 visualizations(viz1, viz2, viz3) represent information for the selected gender.

<h3>Visualization 1</h3>
For viz1 we decided on potraying the enrollments into all majors in each calendar year. The bar chart in this viz is our time sensitive viz. For the extra credit points, we added a donut chart to this visualization. This donut chart is updated according to the bar you click on. On hovering over the parts of the donut, it provides a tool tip of the percentage of students that were enrolled in that year for that race. <br/>
Our observation from this combined visualization was that there is a good number of Hispanic students that have enrolled. Another perception could also be that the data we have is skewed in having more information about Hispanic students. <br/>

_Inspiration:_  [reference](http://bl.ocks.org/diethardsteiner/3287802)<br/>
_Sources:_ 
[reference1](https://bl.ocks.org/vickygisel/c3f4eb2b16b86dd0f641263383f05a13),
[reference2](https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9),
[reference3](http://bl.ocks.org/mstanaland/6106487)<br/>

<h3>Visualization 2</h3>

For viz2 our visualization depicts the variation in CGPAs for the students from high school to their 4th year of college. In this visualization we have omitted the CGPA data associated with the 5th year students because the data was extremely sparse(as explained above) and would not contribute to our study. The slider on the left side helps you choose a high school GPA. Based on the selection, we are plotting the average CGPA observed for that high school CGPA, and a standard deviation for each academic year. Our aim is to project the approximate CGPA a student can expect to get with a particular starting high school CGPA. The data we have taken spans across all the calendar years. We do have an additional filter, besides gender, to choose 1 from the 14 institutions we've filtered on. <br/>
As you move the slider to change the high school GPA, you will see that there are some values for which there is no data plotted, because there is no data associated with it. In some cases, no error bar is visible because there are not enough values to calculate a good standard deviation. Hence, you would just see the average as dots on the plot.<br/>
One discrepancy that we observed in the data over here is that we have high school CGPAs but we do not know the scale they're on. Another observation we made after the readings this week is that error bar for standard deviation might not be the best choice for our representation and we would like to extend the viz to use a boxplot instead.</br>
_Inspiration:_
[reference](https://bl.ocks.org/NGuernse/8dc8b9e96de6bedcb6ad2c5467f5ef9a) <br/>
_Sources:_ 
[reference](http://seiyria.com/bootstrap-slider/)

<h3>Visualization 3</h3>
For viz3, we agreed upon showing the number of students that dropout from college. One aspect that intrigued us was when do students generally dropout and from which majors. We came up with a filter on the major and as you check and uncheck them, you can see the trend of dropouts across the college years. We were surprised to observe that a lot of students choose to dropout in the senior year of college(after all the struggle!!!). A caveat to keep in mind here is that it would be incorrect to compare a line for one major against another as the number of students enrolling in a course would be different for different majors and the dropouts would be relevant to that number.<br/>

_Inspiration:_ 
[reference](http://bl.ocks.org/DStruths/9c042e3a6b66048b5bd4) <br/>
_Sources:_ 
[reference](https://stackoverflow.com/questions/33502614/d3-how-to-select-element-by-id-when-there-is-a-dot-in-id)

<h3>Visualization 4</h3>

This visualization was created in Tableau and published to our project as a .mov file, as well as a .twb file.  In the Tableau graph, the x-axis shows academic years from 2003-2004 to 2016-2017, while the y-axis shows total female students.  NCWIT ES is differentiated from AA by color; Pink bars show students enrolled in programs that are NCWIT Extension Services members and orange bars show the number of female students in programs that are NCWIT Academic Alliance members.<br/>

The .mov file shows the interactivity as the mouse moved across the screen.  Tooltips appear as the mouse hovers over the bars, showing the number of females, the year, and the NCWIT membership.  Additionally, the information may be filtered by major as shown on the right hand side of the screen.  The viewer may choose to select one, some, or all of the majors and the totals bar will reflect that.<br/>

A significantly higher number of women are enrolled in ES assisted programs.  (The anomalies where this is not the case is for 3 of the top 25 majors Industrial Distribution, Management Information Systems, Computer Software and Media Applications)<br/>


You can see the video for this visualization [here](https://www.youtube.com/watch?v=6-zR8niosi8&feature=youtu.be) and the tableau workbook [here](https://github.com/INFO-4602-5602/project-2-ncwit-team-9/tree/master/Vis4)

<h3>Above and Beyond</h3>
<b>Dashboarding:</b> All the visualizations are on the same page. We consider this a dashboard because the website follows a one page architecture where all visualizations can be viewed by scrolling.<br/>
<b>Added Visualizations:</b> We have added a donut chart in visualization 1 and an additional video of the prototyping done in tableau.<br/>
<b>Dynamic Queries:</b> visualization 2 has a slider for high school gpa and dropdown for institutions and the visualization 3 has a check box legend for the majors<br/>
<b>Missing Data:</b> We filtered out the data for the institutions that had dense data and used this filtered data across all visualizations to maintain consistency.<br/>
<b>Coordinated Views:</b> In visualization 1, we have added interaction between the bar chart and the donut chart, where when you click on the bar for a year, it will show you the demographic of the students enrolled that year.<br/>
<b>Overview+Detail:</b> As you move through visualization 1 and visualization 2 you will see that they depict data for the gender you have selected on the left pane.  <br/>

<h3>Team Roles</h3>
<b>Ashwin: </b> Data cleaning, Data conversion, d3 visualization<br/>
<b>Gena: </b> Data cleaning, Data analysis, tableau visualization<br/>
<b>Sreesha: </b> Data conversion, reporting, styling<br/>
<b>Supriya: </b> Data conversion, d3 visualization<br/>

<h3>How to Run</h3>
You can download the 'submission' folder and run the index.html file in a web browser of your choice.

