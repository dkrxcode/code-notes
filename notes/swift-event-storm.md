source: https://www.youtube.com/watch?v=7-fRtd8LUwA&amp%3Bfeature=youtu.bel&ab_channel=ExploreDDD

How does the system want to behave?
What is the pen and paper version of this system (no tech)?

## Benefits
* DDD and clean architecture problem solving learned by doing with arts and crafts. Helps think outside the box. 
  - "Discover what is the real problem is"
* Facilitate teams to discover design solutions on their own rather than being told. 
  - Let the "solution" be the hero not the "Architect"
* Team ownership of arch design. No single owner.

## Event storming
* Define vocabulary "What do we call these things?"
* Define domain clumps "What are the centers of gravity?"

* Discover domain and bounded context
* Discover domain candidates, "centers of gravity"
* Domain: Services, component candidates

## Boris
AKA: Domain graph, communication graph, relationship graph 

* Define general architecture that can handle:
    - one simple thin slice through the system
    - one representative complex thin slice though the system

* Model relationships using "Thin slices" ex Happy path
* Exposes APIs, sync/async interactions, conceptual architeture

## Snap-E
AKA: Service Info Card, shorthand documentation, BORIS discovery notes

Capture information discovered about the service

* APIs, Data, Business rules, Pub/Sub, and Risks

## Next
Now that we know how the system wants to behave
Lets see what patterns we can apply to solve those problems within these constraints