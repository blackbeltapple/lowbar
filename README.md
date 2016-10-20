# Lowbar

## Goals

1. Continue practicing test-driven development (TDD) - both the process and the
tools you'll be using to do it from now until the end of the course (and beyond).
2. Get an 'inside view' of one of the most heavily used JavaScript libraries
[underscore](http://underscorejs.org/) (11m downloads on NPM last month) and
get used to reading its API documentation.
3. Become accustomed to using [NPM](https://www.npmjs.com/) to find and install
JS libraries
4. Learn to effectively pair program and use Git/Github as a collaboration tool.
5. Lay the foundations for understanding the functional style of programming
that JS lends itself so well to

## Workflow

A key requirement for this sprint is to get used to collaborating on a codebase using git and Github. The workflow we will be using is as follows:

1. To begin, person A in the pair should fork and clone the project.
2. The other person (person B) should navigate to their pair's fork (e.g. githubUserA's fork will be located at: https://github.com/githubUserA/October-wk01-lowbar) and should clone githubUserA's repository.
3. Both pairs will be working on **the same codebase**, i.e. code that lives in person A's repository. To avoid merge conflicts, you should avoid both working on your copies of the code at the same time and should be rigorous about sticking to the 'driving and navigating' model of pair programming.
4. After each passing test that the driver writes, the driver should add, commit and push their work. Use neat, uniformly formatted commit messages.

  `$ git add .`

  `$ git commit -m '[_.map] returns an array'`

  `$ git push origin master`

5. Then switch the driver and the navigator. The new driver, working on their own machine, should make sure their codebase is up to date by pulling:

  `$ git pull origin master`

6. The driver types until the next test is passing, at which point the adding, committing, pushing, switching and pulling process is repeated.

---

## Tasks

The Lowbar Sprint involves reimplementing a JS library as if you were its
author. In particular, you'll need to reimplement the following methods:

1. identity
2. first
3. last
4. each
5. indexOf
6. filter
7. reject
8. uniq
9. map
10. pluck
11. reduce
12. contains
13. every
14. some
15. extends
16. defaults
17. once
18. memoize
19. delay
20. shuffle
21. invoke
22. sortBy
23. zip
24. flatten
25. intersection
26. difference
27. throttle

## Resources

You should be heavily referencing the APIs of the following:

1. [The Mocha Test Framework](https://mochajs.org/)
2. [The Chai Assertion Library](http://chaijs.com/)
3. [Sinon - spies, stubs & mocks](http://sinonjs.org/)
4. [Underscore](http://underscorejs.org/)
