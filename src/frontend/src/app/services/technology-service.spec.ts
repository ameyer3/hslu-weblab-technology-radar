import { of } from "rxjs";
import { Technology, TechnologyService } from "./technology.service";

describe('TechnologyService', () => {

    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy };
    let technologyService: TechnologyService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
        technologyService = new TechnologyService(httpClientSpy as any);
    });

    it('should get technologies', () => {
        const expectedTechs: Technology[] = [
            { id: 1, name: "testname1", description: "description1", category: "Techniques", ring: "Adopt", ringdescription: "ringdescription", published: true },
            { id: 2, name: "testname4", description: "description4", category: "Tools", ring: "Hold", ringdescription: "ringdescription", published: true },
            { id: 3, name: "testname5", description: "description5", category: "Tools", ring: "Trial", ringdescription: "ringdescription", published: true },

        ];

        httpClientSpy.get.and.returnValue(of(expectedTechs));

        technologyService.getAllTechnologies().subscribe(tech => expect(tech).toEqual(expectedTechs, 'expected techs'), fail);
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });


    it('should get published technologies', () => {
        const expectedTechs: Technology[] = [
            { id: 1, name: "testname1", description: "description1", category: "Techniques", ring: "Adopt", ringdescription: "ringdescription", published: true },
            { id: 2, name: "testname4", description: "description4", category: "Tools", ring: "Hold", ringdescription: "ringdescription", published: true },
            { id: 3, name: "testname5", description: "description5", category: "Tools", ring: "Trial", ringdescription: "ringdescription", published: true },

        ];

        httpClientSpy.get.and.returnValue(of(expectedTechs));

        technologyService.getAllPublishedTechnologies().subscribe(tech => expect(tech).toEqual(expectedTechs, 'expected techs'), fail);
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });


    it('should add technology', () => {
        const tech: Technology = { id: 1, name: "testname1", description: "description1", category: "Techniques", ring: "Adopt", ringdescription: "ringdescription", published: true };

        httpClientSpy.post.and.returnValue(of(tech));

        technologyService.createNewTechnology(tech);
        expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });

    it('should update technology', () => {
        const tech: Technology = { id: 1, name: "testname1", description: "description1", category: "Techniques", ring: "Adopt", ringdescription: "ringdescription", published: true };

        httpClientSpy.put.and.returnValue(of(tech));

        technologyService.updateTechnology(tech);
        expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    });

    it('should publish technology', () => {
        const tech: Technology = { id: 1, name: "testname1", description: "description1", category: "Techniques", ring: "Adopt", ringdescription: "ringdescription", published: true };

        httpClientSpy.put.and.returnValue(of(tech));

        technologyService.updatePublishTechnology(tech);
        expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    });
});